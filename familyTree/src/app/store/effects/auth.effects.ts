import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { IAuthState } from '../state/auth.state';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthStateActionsEnum } from '../actions/auth-state.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { FirebaseError } from 'src/app/models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import firebase from 'firebase/compat';
import { RoutesEnum } from '../../app-routing.module';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly store: Store<IAuthState>,
  ) {
  }
  
  signUpWithEmail$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SignUpWithEmail),
    switchMap(({ user }) => this.authService.signUp(user).pipe(
      map((data: firebase.auth.UserCredential) => ({ type: AuthStateActionsEnum.SignUpWithEmailSuccess, data })),
      catchError((error: FirebaseError) => of({ type: AuthStateActionsEnum.SignUpWithEmailError, error })),
    )),
  ));
  
  signUpWithEmailSuccess$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SignUpWithEmailSuccess),
    tap(({ data: { user } }) => {
      console.log((user as firebase.User).uid);
      this.toastr.success(`User with email ${(user as firebase.User).email} successfully registered!`, 'Success');
      this.router.navigate(['/', RoutesEnum.TREE]);
    }),
  ), { dispatch: false });
  
  signUpWithEmailError$: Observable<never> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SignUpWithEmailError),
    tap(({ error: { code, name } }) => {
      this.toastr.error(code, name);
    }),
  ), { dispatch: false });
}
