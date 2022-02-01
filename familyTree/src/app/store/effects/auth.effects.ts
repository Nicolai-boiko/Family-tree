import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { IAuthState } from '../state/auth.state';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  AuthStateActions,
  AuthStateActionsEnum,
  SignUpWithEmailError,
  SignUpWithEmailSuccess,
} from '../actions/auth-state.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { FirebaseError, IUser } from 'src/app/models';
import { RoutesEnum } from 'src/app/app-routing.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import firebase from 'firebase/compat';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly store: Store<IAuthState>,
  ) {}
  
  signUpWithEmail$: Observable<AuthStateActions> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SignUpWithEmail),
    map((action: { payload: IUser }) => action.payload ),
    switchMap((user: IUser) => this.authService.signUp(user).pipe(
      map((userCredential: UserCredential) => new SignUpWithEmailSuccess({ data: userCredential })),
      catchError((error: FirebaseError) => of(new SignUpWithEmailError(error))),
    )),
  ));
  
  signUpWithEmailSuccess$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SignUpWithEmailSuccess),
    map((action: SignUpWithEmailError) => action.payload),
    tap((data) => {
      this.toastr.success('You are successfully registered!', '');
      this.router.navigateByUrl('/');
    }),
  ), { dispatch: false });
  
  signUpWithEmailError$: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(AuthStateActionsEnum.SignUpWithEmailError),
    map((action: SignUpWithEmailError) => action.payload),
    tap((error: FirebaseError) => {
      this.toastr.error(`${error.message ?? error.code}`, `Error`);
    }),
  ), { dispatch: false });
}
