import { ActionReducerMap } from '@ngrx/store';
import { AUTH_FEATURE_NAME, authFeature } from './auth-state.reducer';
import { IAppState } from '../state/app.state';

export const appReducer: ActionReducerMap<IAppState, any> = {
  [AUTH_FEATURE_NAME]: authFeature.reducer,
};
