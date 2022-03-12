import { AuthStateActionsEnum, CoreActions } from './auth-state.actions';
import { IUser } from '../../constants/Interfaces/common.interfaces';

describe('auth-state.actions', () => {
  describe('signUpWithEmail', () => {
    it('should create signUpWithEmail action type', () => {
      const action = CoreActions.signUpWithEmail;
      
      expect(action.type).toEqual(AuthStateActionsEnum.SignUpWithEmail);
    });
    
    it('should has passed props', () => {
      const mockIUser: IUser = { email: 'dummyEmail', firstName: 'dummyName'} as IUser;
      const action = CoreActions.signUpWithEmail({ user: mockIUser });
      
      expect(action.user).toEqual(mockIUser);
    });
  });
});
