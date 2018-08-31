import { User } from './user.model';
import { UserActions, UserActionTypes } from './user.actions';

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null
};

export function reducer(state = initialState, action: UserActions): State {
    switch (action.type) {
        case UserActionTypes.LOGIN: {
            return {
                ...state,
                ...action.payload
            };
        }
        case UserActionTypes.LOGOUT: {
            return initialState;
        }
        case UserActionTypes.MODIFY: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                }
            };
        }
        default: {
            return state;
        }
    }
}