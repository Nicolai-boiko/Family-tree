import { IUser, FirebaseError } from 'src/app/models';

export const initialAuthState: IAuthState = {
  user: null,
  errorMessage: null,
  infoMessage: null,
  isLoading: false,
};

export interface IAuthState {
  user: IUser | null;
  errorMessage: FirebaseError | null;
  infoMessage: string | null;
  isLoading: boolean;
}
