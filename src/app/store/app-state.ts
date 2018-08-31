import { createFeatureSelector } from '@ngrx/store';

import * as user from './user/user.reducers';


export interface AppState {
    userState: user.State;
}

export const reducers = {
    user: user.reducer
};

export const selectUserState = createFeatureSelector<AppState>('user');
