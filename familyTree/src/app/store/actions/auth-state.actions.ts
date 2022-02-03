import { createAction, props } from '@ngrx/store';
import { FirebaseError, IUser } from 'src/app/models';
import firebase from 'firebase/compat';

export enum AuthStateActionsEnum {
  SignUpWithEmail = '[auth-state] Sign-up with email',
  SignUpWithEmailSuccess = '[auth-state] Sign-up with email succeeded',
  SignUpWithEmailError = '[auth-state] Sign-up with email error',
  LogoutStart = '[auth-state] Logout starts',
  LogoutEnd = '[auth-state] Logout ends',
  SignInWithEmail = '[auth-state] Sign-in with email',
  SignInWithEmailSuccess = '[auth-state] Sign-in with email succeeded',
  SignInWithEmailError = '[auth-state] Sign-in with email error',
}

export const signUpWithEmail = createAction(
  AuthStateActionsEnum.SignUpWithEmail,
  props<{ user: IUser }>(),
);

export const signUpWithEmailSuccess = createAction(
  AuthStateActionsEnum.SignUpWithEmailSuccess,
  props<{ data: firebase.auth.UserCredential }>(),
);

export const signUpWithEmailError = createAction(
  AuthStateActionsEnum.SignUpWithEmailError,
  props<{ error: FirebaseError }>(),
);
