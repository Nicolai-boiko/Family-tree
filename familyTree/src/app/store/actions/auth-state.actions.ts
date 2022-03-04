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
    GetUserCollection = '[auth-state] Get user collection',
    GetUserCollectionSuccess = '[auth-state] Get user collection success',
    GetUserCollectionError = '[auth-state] Get user collection error',
    UpdateUserCollection = '[auth-state] Update user collection',
    UpdateUserCollectionSuccess = '[auth-state] Update user collection success',
    UpdateUserCollectionError = '[auth-state] Update user collection error',
    UploadUserPhoto = '[auth-state] Upload user photo',
    UploadUserPhotoProgress = '[auth-state] Upload user photo progress',
    UploadUserPhotoSuccess = '[auth-state] Upload user photo success',
    UploadUserPhotoError = '[auth-state] Upload user photo error',
    WriteFromFirebaseInUserPhotoURL = '[auth-state] Write user photo url in store user',
    ClearPhotoUserURL = '[auth-state] Clear user photo url',
}

export const signUpWithEmail = createAction(
    AuthStateActionsEnum.SignUpWithEmail,
    props<{ user: IUser }>(),
);

export const signUpWithEmailSuccess = createAction(
    AuthStateActionsEnum.SignUpWithEmailSuccess,
    props<{ user: IUser, data: firebase.auth.UserCredential }>(),
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

export const getUserCollection = createAction(
    AuthStateActionsEnum.GetUserCollection,
    props<{ userUID: string }>(),
);

export const getUserCollectionSuccess = createAction(
    AuthStateActionsEnum.GetUserCollectionSuccess,
    props<{ userCollection: IUser }>(),
);

export const getUserCollectionError = createAction(
    AuthStateActionsEnum.GetUserCollectionError,
    props<{ error: FirebaseError }>(),
);

export const updateUserCollection = createAction(
    AuthStateActionsEnum.UpdateUserCollection,
    props<{ user: IUser }>(),
);

export const updateUserCollectionSuccess = createAction(
    AuthStateActionsEnum.UpdateUserCollectionSuccess,
    props<{ userUID: string }>(),
);

export const updateUserCollectionError = createAction(
    AuthStateActionsEnum.UpdateUserCollectionError,
    props<{ error: FirebaseError }>(),
);

export const uploadUserPhoto = createAction(
    AuthStateActionsEnum.UploadUserPhoto,
    props<{ file: File }>(),
);

export const uploadUserPhotoProgress = createAction(
    AuthStateActionsEnum.UploadUserPhotoProgress,
    props<{ loadProgress: number }>(),
);

export const uploadUserPhotoSuccess = createAction(
    AuthStateActionsEnum.UploadUserPhotoSuccess,
    props<{ taskRef: string }>(),
);

export const uploadUserPhotoError = createAction(
    AuthStateActionsEnum.UploadUserPhotoError,
    props<{ error: FirebaseError }>(),
);

export const writeFromFirebaseInUserPhotoURL = createAction(
    AuthStateActionsEnum.WriteFromFirebaseInUserPhotoURL,
    props<{ downloadURL: string }>(),
);
export const clearPhotoUserURL = createAction(
    AuthStateActionsEnum.ClearPhotoUserURL,
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
    getUserCollection,
    getUserCollectionSuccess,
    getUserCollectionError,
    updateUserCollection,
    updateUserCollectionSuccess,
    updateUserCollectionError,
    uploadUserPhoto,
    uploadUserPhotoProgress,
    uploadUserPhotoSuccess,
    uploadUserPhotoError,
    writeFromFirebaseInUserPhotoURL,
    clearPhotoUserURL,
}
