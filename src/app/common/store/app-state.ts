import { createFeatureSelector } from '@ngrx/store';

import * as auth from './auth/auth.reducers';
import { Auth } from '../models/auth.model';

export interface AppState {
    authState: Auth;
    // authState: auth.State;
};

export const reducers = {
    auth: auth.reducer
};

export const AppStateType = {
    user: 'user',
    auth: 'auth',
};

export const selectAuthState = createFeatureSelector<AppState>(AppStateType.auth);
export const selectUserState = createFeatureSelector<AppState>(AppStateType.user);
