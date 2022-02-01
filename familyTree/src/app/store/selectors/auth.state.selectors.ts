import { IAuthState } from '../state/auth.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getAuthState = createFeatureSelector<IAuthState>('authState');

export const isAuthLoading = createSelector(getAuthState, (state: IAuthState) => state.isLoading);

