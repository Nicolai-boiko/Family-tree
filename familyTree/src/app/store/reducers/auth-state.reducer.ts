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
      isLoading: false,
      user: null,
      errorMessage: { code, name },
    })),
  ),
});

export const {
  selectIsLoading,
  selectUser,
  selectErrorMessage,
  selectInfoMessage,
  reducer,
} = authFeature;
