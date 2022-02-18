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
    UserIsLoggedIn = '[auth-state] Check user auth is logged in',
    UserIsLoggedOut = '[auth-state] Check user auth is logged out',
}

export const signUpWithEmail = createAction(
    AuthStateActionsEnum.SignUpWithEmail,
    props<{ user: IUser }>(),
);

export const signUpWithEmailSuccess = createAction(
    AuthStateActionsEnum.SignUpWithEmailSuccess,
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
);

export const signInWithEmailError = createAction(
    AuthStateActionsEnum.SignInWithEmailError,
    props<{ error: FirebaseError }>(),
);

export const logoutStart = createAction(
    AuthStateActionsEnum.LogoutStart,
);

export const logoutEnd = createAction(
    AuthStateActionsEnum.LogoutEnd,
);

export const sendPasswordResetEmail = createAction(
    AuthStateActionsEnum.SendPasswordResetEmail,
    props<{ email: string }>(),
);

export const sendPasswordResetEmailSuccess = createAction(
    AuthStateActionsEnum.SendPasswordResetEmailSuccess,
);

export const sendPasswordResetEmailError = createAction(
    AuthStateActionsEnum.SendPasswordResetEmailError,
    props<{ error: FirebaseError }>(),
);

export const userIsLoggedIn = createAction(
    AuthStateActionsEnum.UserIsLoggedIn,
    props<{ data: firebase.User }>(),
);

export const userIsLoggedOut = createAction(
    AuthStateActionsEnum.UserIsLoggedOut,
);

export const CoreActions = {
    signInWithEmail,
    signInWithEmailError,
    signInWithEmailSuccess,
    signUpWithEmail,
    signUpWithEmailError,
    signUpWithEmailSuccess,
    sendPasswordResetEmail,
    sendPasswordResetEmailError,
    sendPasswordResetEmailSuccess,
    logoutStart,
    logoutEnd,
    userIsLoggedIn,
    userIsLoggedOut,
}
