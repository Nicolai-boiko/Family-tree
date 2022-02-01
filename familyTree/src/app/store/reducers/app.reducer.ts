import { ActionReducerMap } from '@ngrx/store';
import { authStateReducer } from './auth-state.reducer';
import { IAppState } from '../state/app.state';

export const appReducer: ActionReducerMap<IAppState, any> = {
  authState: authStateReducer,
};
