import { Action } from '@ngrx/store';
import { FirebaseError, IUser } from 'src/app/models';

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

export class SignUpWithEmail implements Action {
  public readonly type = AuthStateActionsEnum.SignUpWithEmail;
  constructor(public payload: IUser) {}
}

export class SignUpWithEmailSuccess implements Action {
  public readonly type = AuthStateActionsEnum.SignUpWithEmailSuccess;
  // ToDo need to put the right type here
  constructor(public payload: { data: any }) {}
}

export class SignUpWithEmailError implements Action {
  public readonly type = AuthStateActionsEnum.SignUpWithEmailError;
  constructor(public payload: FirebaseError) {}
}

export class LogoutStart implements Action {
  public readonly type = AuthStateActionsEnum.LogoutStart;
}

export class LogoutEnd implements Action {
  public readonly type = AuthStateActionsEnum.LogoutEnd;
}

export type AuthStateActions =
  | SignUpWithEmail
  | SignUpWithEmailError
  | SignUpWithEmailSuccess
  | LogoutStart
  | LogoutEnd
  ;
