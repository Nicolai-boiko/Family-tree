import { initialAuthState } from '../state/auth.state';
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
        on(CoreActions.getUserCollectionSuccess, (state, { collection }) => ({
            ...state,
            user: {
                ...collection,
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
    ),
});

export const {
    selectIsLoading,
    selectUser,
    selectErrorMessage,
    selectInfoMessage,
    selectIsEmailSend,
    reducer,
  } = authFeature;
