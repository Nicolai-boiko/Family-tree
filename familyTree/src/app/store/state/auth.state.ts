import { IUser, FirebaseError } from 'src/app/constants/Interfaces/common.interfaces';

export interface IAuthState {
  user: IUser | null;
  errorMessage: FirebaseError | null;
  infoMessage: string | null;
  isLoading: boolean;
  isEmailSend: boolean;
  isInitializing: boolean,
}

export const initialAuthState: IAuthState = {
  user: null,
  errorMessage: null,
  infoMessage: null,
  isLoading: false,
  isEmailSend: false,  
  isInitializing: true,
};
