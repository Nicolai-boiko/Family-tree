import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { AuthStateActionsEnum } from '../actions/auth-state.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { FirebaseError } from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import firebase from 'firebase/compat';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {}

  signUpWithEmail$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SignUpWithEmail),
    switchMap(({ user }) => this.authService.signUp(user).pipe(
      map(() => ({ type: AuthStateActionsEnum.SignUpWithEmailSuccess })),
      catchError((error: FirebaseError) => of({ type: AuthStateActionsEnum.SignUpWithEmailError, error })),
    )),
  ));
  
  signUpWithEmailSuccess$: Observable<never> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SignUpWithEmailSuccess),
    tap(() => this.toastr.success(`You are successfully registered!`, 'Success')),
  ), { dispatch: false });
  
  signUpWithEmailError$: Observable<never> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SignUpWithEmailError),
    tap(({ error: { code, name } }) => this.toastr.error(code, name)),
  ), { dispatch: false });

  signInWithEmail$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SignInWithEmail),
    switchMap(({ user }) => this.authService.signIn(user).pipe(
      map(() => ({ type: AuthStateActionsEnum.SignInWithEmailSuccess })),
      catchError((error: FirebaseError) => of({ type: AuthStateActionsEnum.SignInWithEmailError, error })),
    )),
  ));
  
  signInWithEmailSuccess$: Observable<never> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SignInWithEmailSuccess),
    tap(() => this.toastr.success(`You are successfully logged in!`, 'Success')),
  ), { dispatch: false });
  
  signInWithEmailError$: Observable<never> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SignInWithEmailError),
    tap(({ error: { code, name } }) => this.toastr.error(code, name)),
  ), { dispatch: false });

  logoutStart$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.LogoutStart),
    switchMap(() => this.authService.signOut().pipe(
      map(() => ({ type: AuthStateActionsEnum.LogoutEnd })),
    )),
  ));
  
  logoutEnd$: Observable<never> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.LogoutEnd),
    tap(() => this.toastr.success(`You are successfully logged out!`, 'Success')),
  ), { dispatch: false });

  sendPasswordResetEmail$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SendPasswordResetEmail),
    switchMap(({ email }) => this.authService.resetPassword(email).pipe(
      map(() => ({ type: AuthStateActionsEnum.SendPasswordResetEmailSuccess })),
      catchError((error: FirebaseError) => of({ type: AuthStateActionsEnum.SendPasswordResetEmailError, error })),
    )),
  ));
  
  sendPasswordResetEmailSuccess$: Observable<never> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SendPasswordResetEmailSuccess),
    tap(() => this.toastr.success(`Reset password information was send on your email!`, 'Success')),
  ), { dispatch: false });
  
  sendPasswordResetEmailError$: Observable<never> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SendPasswordResetEmail),
    tap(({ error: { code, name } }) => this.toastr.error(code, name)),
  ), { dispatch: false });
}
