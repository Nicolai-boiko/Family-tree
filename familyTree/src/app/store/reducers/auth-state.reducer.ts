import { IAuthState, initialAuthState } from '../state/auth.state';
import { AuthStateActions, AuthStateActionsEnum } from '../actions/auth-state.actions';
import { IUser } from '../../models';

export const authStateReducer = (
  state: IAuthState = initialAuthState,
  action: AuthStateActions,
): IAuthState => {
  switch (action.type) {
    case AuthStateActionsEnum.SignUpWithEmail:
      return {
        ...state,
        user: {
          ...action.payload,
          password: null,
        },
        isLoading: true,
        errorMessage: null,
      };
    case AuthStateActionsEnum.SignUpWithEmailSuccess:
      return {
        ...state,
        isLoading: false,
      };
    case AuthStateActionsEnum.SignUpWithEmailError:
      return {
        ...state,
        isLoading: false,
        user: null,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
