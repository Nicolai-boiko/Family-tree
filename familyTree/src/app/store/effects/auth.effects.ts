import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { CoreActions } from '../actions/auth-state.actions';
import { catchError, concatMap, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FirebaseError } from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { Router } from '@angular/router';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import { Action, Store } from '@ngrx/store';
import { IAuthState } from '../state/auth.state';
import { selectUserUID } from '../reducers/auth-state.reducer';
import firebase from 'firebase/compat';

@Injectable()
export class AuthEffects {
  signUpWithEmail$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.signUpWithEmail),
    switchMap(({ user }) => this.authService.signUp(user).pipe(
      map((data) => CoreActions.signUpWithEmailSuccess({ user, data })),
      catchError((error: FirebaseError) => of(CoreActions.signUpWithEmailError({ error }))),
    )),
  ));

  signUpWithEmailSuccess$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.signUpWithEmailSuccess),
    filter(Boolean),
    map(({ user, data }) => this.authService.createCollection(user, data)),
    tap(() => {
      this.route.navigate(['/', RoutesEnum.TREE]);
      this.toastr.success(`You are successfully registered!`);
    }),
  ), { dispatch: false });

  signUpWithEmailError$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.signUpWithEmailError),
    tap(({ error: { code, name } }) => this.toastr.error(code, name)),
  ), { dispatch: false });

  signInWithEmail$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.signInWithEmail),
    switchMap(({ user }) => this.authService.signIn(user).pipe(
      map(() => CoreActions.signInWithEmailSuccess()),
      catchError((error: FirebaseError) => of(CoreActions.signInWithEmailError({ error }))),
    )),
  ));

  signInWithEmailSuccess$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.signInWithEmailSuccess),
    tap(() => {
      this.route.navigate(['/', RoutesEnum.TREE]);
      this.toastr.success(`You are successfully logged in!`);
    }),
  ), { dispatch: false });

  signInWithEmailError$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.signInWithEmailError),
    tap(({ error: { code, name } }) => this.toastr.error(code, name)),
  ), { dispatch: false });

  logoutStart$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.logoutStart),
    switchMap(() => this.authService.signOut().pipe(
      map(() => CoreActions.logoutEnd()),
    )),
  ));

  logoutEnd$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.logoutEnd),
    tap(() => {
      this.route.navigate(['/', RoutesEnum.HOME]);
      this.toastr.success(`You are successfully logged out!`);
    }),
  ), { dispatch: false });

  sendPasswordResetEmail$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.sendPasswordResetEmail),
    switchMap(({ email }) => this.authService.resetPassword(email).pipe(
      map(() => CoreActions.sendPasswordResetEmailSuccess()),
      catchError((error: FirebaseError) => of(CoreActions.sendPasswordResetEmailError({ error }))),
    )),
  ));

  sendPasswordResetEmailSuccess$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.sendPasswordResetEmailSuccess),
    tap(() => this.toastr.success(`Reset password information was send on your email!`)),
  ), { dispatch: false });

  sendPasswordResetEmailError$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.sendPasswordResetEmailError),
    tap(({ error: { code, name } }) => this.toastr.error(code, name)),
  ), { dispatch: false });

  getUserCollection$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.getUserCollection),
    switchMap(({ userUID }) => this.authService.getCollection(userUID).pipe(
      map((userCollection) => CoreActions.getUserCollectionSuccess({ userCollection })),
      catchError((error: FirebaseError) => of(CoreActions.getUserCollectionError({ error }))),
    ))
  ));

  getUserCollectionError$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.getUserCollectionError),
    tap(({ error: { code, name } }) => this.toastr.error(code, name)),
  ), { dispatch: false });

  updateUserCollection$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.updateUserCollection),
    map((action) => action.user),
    withLatestFrom(this.store.select(selectUserUID).pipe(filter(Boolean))),
    map(([userFormData, userUID]: [IUser, string]) => {
      this.authService.updateCollection(userFormData, userUID);
      return CoreActions.updateUserCollectionSuccess({ userUID });
    }),
    catchError((error: FirebaseError) => of(CoreActions.updateUserCollectionError({ error }))),
  ));

  updateUserCollectionSuccess$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.updateUserCollectionSuccess),
    map(({ userUID }) => CoreActions.getUserCollection({ userUID })),
    tap(() => this.toastr.success('New data has saved')),
  ));

  updateUserCollectionError$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.updateUserCollectionError),
    tap(({ error: { code, name } }) => this.toastr.error(code, name)),
  ), { dispatch: false });

  uploadUserPhoto$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.uploadUserPhoto),
    map((action) => action.file),
    withLatestFrom(this.store.select(selectUserUID).pipe(filter(Boolean))),
    concatMap(([file, userUID]: [File, string]) => this.authService.uploadUserPhoto(file, userUID).pipe(
      filter(Boolean),
      map((taskSnapshot: firebase.storage.UploadTaskSnapshot) => this.getActionFromUploadTaskSnapshot(taskSnapshot)),
      catchError((error: FirebaseError) => of(CoreActions.uploadUserPhotoError({ error }))),
    ))
  ));

  uploadUserPhotoSuccess$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.uploadUserPhotoSuccess),
    switchMap(({ taskRef }) => this.authService.getPhotoURL(taskRef).pipe(
      map((downloadURL: string) => CoreActions.writeUserPhotoURL({ downloadURL })),
    )),
    tap(() => this.toastr.success('New photo has uploaded')),
  ));

  uploadUserPhotoError$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.uploadUserPhotoError),
    tap(({ error: { code, name } }) => this.toastr.error(code, name)),
  ), { dispatch: false });

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: Router,
    private store: Store<IAuthState>,
  ) { }

  private getActionFromUploadTaskSnapshot(taskSnapshot: firebase.storage.UploadTaskSnapshot): Action {
    switch (taskSnapshot.state) {
      case 'running':
        const { bytesTransferred: loaded, totalBytes: total } = taskSnapshot;

        return CoreActions.uploadUserPhotoProgress({ loadProgress: Math.round(loaded / total * 100) });
      case 'success':
        return CoreActions.uploadUserPhotoSuccess({ taskRef: taskSnapshot.ref.fullPath });
      default:
        return CoreActions.uploadUserPhotoError({ error: { message: "Photo doesn't updated", code: '' } });
    }
  }
}
