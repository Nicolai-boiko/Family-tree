import { initialAuthState } from '../state/auth.state';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as AuthStateActions from '../actions/auth-state.actions';

export const AUTH_FEATURE_NAME = 'authState';

export const authFeature = createFeature({
    name: AUTH_FEATURE_NAME,
    reducer: createReducer(
        initialAuthState,
        on(AuthStateActions.signUpWithEmail, (state, { user }) => ({
            ...state,
            user: {
                ...user,
                password: null,
            },
            isLoading: true,
            errorMessage: null,
            infoMessage: null,
        })),
        on(AuthStateActions.signUpWithEmailSuccess, (state) => ({
            ...state,
            isLoading: false,
        })),
        on(AuthStateActions.signUpWithEmailError, (state, { error: { code, name } }) => ({
            ...state,
            user: null,
            isLoading: false,
            errorMessage: { code, name },
        })),
        on(AuthStateActions.signInWithEmail, (state, { user }) => ({
            ...state,
            user,
            isLoading: true,
            errorMessage: null,
            infoMessage: null,
        })),
        on(AuthStateActions.signInWithEmailSuccess, (state, { data }) => ({
            ...state,
            isLoading: false,
            infoMessage: 'null kek',
        })),
        on(AuthStateActions.signInWithEmailError, (state, { error: { code, name } }) => ({
            ...state,
            user: null,
            isLoading: false,
            errorMessage: { code, name },
        })),
        on(AuthStateActions.LogoutStart, (state) => ({
            ...state,
            isLoading: true,
            errorMessage: null,
            infoMessage: null,
        })),
        on(AuthStateActions.LogoutEnd, (state) => ({
            ...state,
            user: null,
            isLoading: false,
        })),
        on(AuthStateActions.SendPasswordResetEmail, (state) => ({
            ...state,
            isLoading: true,
            isEmailSend: false,
            errorMessage: null,
            infoMessage: null,
        })),
        on(AuthStateActions.SendPasswordResetEmailSuccess, (state) => ({
            ...state,
            isLoading: false,
            isEmailSend: true,
        })),
        on(AuthStateActions.SendPasswordResetEmailError, (state) => ({
            ...state,
            isLoading: false,
        })),
        on(AuthStateActions.UserIsLoggedIn, (state, { data }) => ({
            ...state,
            user: {
                email: data.email as string,
                password: null,
            },
        })),
        on(AuthStateActions.UserIsLoggedOut, (state) => ({
            ...state,
            user: null,
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
