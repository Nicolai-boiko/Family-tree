import { IUser, FirebaseError } from 'src/app/constants/Interfaces/common.interfaces';

export enum UploadStatus {
  Ready = 'ready',
  Started = 'started',
  Running = 'running',
  Failed = 'failed',
  Success = 'success',
}

export interface IAuthState {
  user: IUser | null;
  errorMessage: FirebaseError | null;
  infoMessage: string | null;
  isLoading: boolean;
  isEmailSend: boolean;
  isInitializing: boolean;
  progressStatus: UploadStatus;
  loadProgress: number;
}

export const initialAuthState: IAuthState = {
  user: null,
  errorMessage: null,
  infoMessage: null,
  isLoading: false,
  isEmailSend: false,  
  isInitializing: true,
  progressStatus: UploadStatus.Ready,
  loadProgress: 0,
};
