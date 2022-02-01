import { IAuthState, initialAuthState } from './auth.state';

export interface IAppState {
  authState: IAuthState;
}

export const initialAppState: IAppState = {
  authState: initialAuthState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
