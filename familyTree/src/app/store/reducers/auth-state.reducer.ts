import { initialAuthState, UploadStatus } from '../state/auth.state';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CoreActions } from '../actions/auth-state.actions';

export const AUTH_FEATURE_NAME = 'authState';

export const authFeature = createFeature({
    name: AUTH_FEATURE_NAME,
    reducer: createReducer(
        initialAuthState,
        on(
            CoreActions.signUpWithEmail,
            CoreActions.sendPasswordResetEmail,
            CoreActions.getUserCollection,
            CoreActions.updateUserCollection,
            CoreActions.logoutStart,
            (state) => ({
                ...state,
                isLoading: true,
                errorMessage: null,
                infoMessage: null,
                isEmailSend: false,
            })
        ),
        on(
            CoreActions.signUpWithEmailSuccess,
            CoreActions.signInWithEmailSuccess,
            CoreActions.updateUserCollectionSuccess,
            (state) => ({
                ...state,
                isLoading: false,
            })
        ),
        on(
            CoreActions.signUpWithEmailError,
            CoreActions.signInWithEmailError,
            (state, { error: { code, name } }) => ({
                ...state,
                user: null,
                isLoading: false,
                errorMessage: { code, name },
            })
        ),
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
        on(CoreActions.sendPasswordResetEmailSuccess, (state) => ({
            ...state,
            isLoading: false,
            isEmailSend: true,
        })),
        on(
            CoreActions.sendPasswordResetEmailError,
            CoreActions.updateUserCollectionError,
            (state, { error: { code, name } }) => ({
                ...state,
                isLoading: false,
                errorMessage: { code, name },
            })
        ),
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
        on(CoreActions.writeFromFirebaseInUserPhotoURL, (state, { downloadURL }) => ({
            ...state,
            user: {
                ...state.user,
                photoUrl: downloadURL,
            },
        })),
        on(CoreActions.clearPhotoUserURL, (state) => ({
            ...state,
            user: {
                ...state.user,
                photoUrl: '',
            }
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

export const selectUserPhotoURL = createSelector(selectUser, (state) => state?.photoUrl);
export const selectUserUID = createSelector(selectUser, (state) => state?.uid);
