import { createAction, props } from "@ngrx/store";
import { IUser, FirebaseError } from "src/app/constants/Interfaces/common.interfaces";
import firebase from "firebase/compat";

export enum AuthStateActionsEnum {
    SignUpWithEmail = '[auth-state] Sign-up with email',
    SignUpWithEmailSuccess = '[auth-state] Sign-up with email succeeded',
    SignUpWithEmailError = '[auth-state] Sign-up with email error',
    LogoutStart = '[auth-state] Logout starts',
    LogoutEnd = '[auth-state] Logout ends',
    SignInWithEmail = '[auth-state] Sign-in with email',
    SignInWithEmailSuccess = '[auth-state] Sign-in with email succeeded',
    SignInWithEmailError = '[auth-state] Sign-in with email error',
    SendPasswordResetEmail = '[auth-state] Send password reset email',
    SendPasswordResetEmailSuccess = '[auth-state] Send password reset email succeeded',
    SendPasswordResetEmailError = '[auth-state] Send password reset email error',
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

export const signInWithEmail = createAction(
    AuthStateActionsEnum.SignInWithEmail,
    props<{ user: IUser }>(),
);

export const signInWithEmailSuccess = createAction(
    AuthStateActionsEnum.SignInWithEmailSuccess,
    props<{ data: firebase.auth.UserCredential }>(),
);

export const signInWithEmailError = createAction(
    AuthStateActionsEnum.SignInWithEmailError,
    props<{ error: FirebaseError }>(),
);

export const LogoutStart = createAction(
    AuthStateActionsEnum.LogoutStart,
);

export const LogoutEnd = createAction(
    AuthStateActionsEnum.LogoutEnd,
);

export const SendPasswordResetEmail = createAction(
    AuthStateActionsEnum.SendPasswordResetEmail,
    props<{ email: string }>(),
);

export const SendPasswordResetEmailSuccess = createAction(
    AuthStateActionsEnum.SendPasswordResetEmailSuccess,
);

export const SendPasswordResetEmailError = createAction(
    AuthStateActionsEnum.SendPasswordResetEmailError,
    props<{ error: FirebaseError }>(),
);
