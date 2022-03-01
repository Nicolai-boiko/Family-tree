import { initialAuthState, UploadStatus } from '../state/auth.state';
import { createFeature, createReducer, on } from '@ngrx/store';
import { CoreActions } from '../actions/auth-state.actions';

export const AUTH_FEATURE_NAME = 'authState';

export const authFeature = createFeature({
    name: AUTH_FEATURE_NAME,
    reducer: createReducer(
        initialAuthState,
        on(CoreActions.signUpWithEmail, (state) => ({
            ...state,
            isLoading: true,
            errorMessage: null,
            infoMessage: null,
            isEmailSend: false,
        })),
        on(CoreActions.signUpWithEmailSuccess, (state) => ({
            ...state,
            isLoading: false,
        })),
        on(CoreActions.signUpWithEmailError, (state, { error: { code, name } }) => ({
            ...state,
            user: null,
            isLoading: false,
            errorMessage: { code, name },
        })),
        on(CoreActions.signInWithEmail, (state, { user }) => ({
            ...state,
            user: {
                ...state.user,
                email: user.email,
                password: null,
            },
            isLoading: true,
            errorMessage: null,
            infoMessage: null,
            isEmailSend: false,
        })),
        on(CoreActions.signInWithEmailSuccess, (state) => ({
            ...state,
            isLoading: false,
            infoMessage: null,
        })),
        on(CoreActions.signInWithEmailError, (state, { error: { code, name } }) => ({
            ...state,
            user: null,
            isLoading: false,
            errorMessage: { code, name },
        })),
        on(CoreActions.logoutStart, (state) => ({
            ...state,
            isLoading: true,
            errorMessage: null,
            infoMessage: null,
        })),
        on(CoreActions.logoutEnd, (state) => ({
            ...state,
            user: null,
            isLoading: false,
            isInitializing: false,
        })),
        on(CoreActions.userIsLoggedOut, (state) => ({
            ...state,
            isInitializing: false,
        })),
        on(CoreActions.sendPasswordResetEmail, (state) => ({
            ...state,
            isLoading: true,
            isEmailSend: false,
            errorMessage: null,
            infoMessage: null,
        })),
        on(CoreActions.sendPasswordResetEmailSuccess, (state) => ({
            ...state,
            isLoading: false,
            isEmailSend: true,
        })),
        on(CoreActions.sendPasswordResetEmailError, (state, { error: { code, name } }) => ({
            ...state,
            isLoading: false,
            errorMessage: { code, name },
        })),
        on(CoreActions.getUserCollection, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(CoreActions.getUserCollectionSuccess, (state, { userCollection }) => ({
            ...state,
            user: {
                ...state.user,
                ...userCollection,
            },
            isLoading: false,
            isInitializing: false,
        })),
        on(CoreActions.getUserCollectionError, (state, { error: { code, name } }) => ({
            ...state,
            user: null,
            isLoading: false,
            errorMessage: { code, name },
        })),
        on(CoreActions.updateUserCollection, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(CoreActions.updateUserCollectionSuccess, (state) => ({
            ...state,
            isLoading: false,
        })),
        on(CoreActions.updateUserCollectionError, (state, { error: { code, name } }) => ({
            ...state,
            isLoading: false,
            errorMessage: { code, name },
        })),
        on(CoreActions.uploadUserPhoto, (state) => ({
            ...state,
            progressStatus: UploadStatus.Started,
            loadProgress: 0,
        })),
        on(CoreActions.uploadUserPhotoProgress, (state, { loadProgress }) => ({
            ...state,
            progressStatus: UploadStatus.Running, 
            loadProgress,
        })),
        on(CoreActions.uploadUserPhotoSuccess, (state) => ({
            ...state,
            progressStatus: UploadStatus.Success,
            loadProgress: 0,
        })),
        on(CoreActions.uploadUserPhotoError, (state, { error: { code, name } }) => ({
            ...state,
            progressStatus: UploadStatus.Failed,
            errorMessage: { code, name },
        })),
        on(CoreActions.updateUserPhotoURL, (state, { downloadURL }) => ({
            ...state,
            user : {
                ...state.user,
                photoUrl: downloadURL,
            },
        })),
    ),
});

export const {
    selectIsLoading,
    selectUser,
    selectErrorMessage,
    selectInfoMessage,
    selectIsEmailSend,
    selectIsInitializing,
    selectLoadProgress,
    reducer,
  } = authFeature;
