import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] LogInSuccess',
    LOGIN_FAILURE = '[Auth] LogInFailure',
    LOGOUT = '[Auth] Logout',
    MODIFY = '[Auth] Modify',
}

export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) {}
}

export class LogInFailure implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export class Modify implements Action {
    readonly type = AuthActionTypes.MODIFY;
    constructor(public payload: any) {}
}

export type AuthActions =
    | Login
    | LogInSuccess
    | LogInFailure
    | Logout
    | Modify;