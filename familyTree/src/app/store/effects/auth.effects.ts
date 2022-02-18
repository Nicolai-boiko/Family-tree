import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { CoreActions } from '../actions/auth-state.actions';
import { AuthStateActionsEnum } from '../actions/auth-state.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { FirebaseError } from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: Router,
  ) {}

  signUpWithEmail$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.signUpWithEmail),
    switchMap(({ user }) => this.authService.signUp(user).pipe(
      map(() => CoreActions.signUpWithEmailSuccess()),
      catchError((error: FirebaseError) => of(CoreActions.signUpWithEmailError({ error }))),
    )),
  ));
  
  signUpWithEmailSuccess$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.signUpWithEmailSuccess),
    tap(() => {
      this.route.navigate(['/', RoutesEnum.TREE]);
      this.toastr.success(`You are successfully registered!`, 'Success');
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
      this.toastr.success(`You are successfully logged in!`, 'Success');
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
      this.toastr.success(`You are successfully logged out!`, 'Success');
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
    tap(() => this.toastr.success(`Reset password information was send on your email!`, 'Success')),
  ), { dispatch: false });
  
  sendPasswordResetEmailError$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(CoreActions.sendPasswordResetEmailError),
    tap(({ error: { code, name } }) => this.toastr.error(code, name)),
  ), { dispatch: false });
}
