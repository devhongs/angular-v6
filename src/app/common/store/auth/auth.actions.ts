import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] LogInSuccess',
    LOGIN_FAILURE = '[Auth] LogInFailure',
    LOGOUT = '[Auth] Logout',
    MODIFY = '[Auth] Modify',
}

export class LoginAction implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) {}
}

export class LogInSuccessAction implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) {}
}

export class LogInFailureAction implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: any) {}
}

export class LogoutAction implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export class ModifyAction implements Action {
    readonly type = AuthActionTypes.MODIFY;
    constructor(public payload: any) {}
}

export type AuthActions =
    | LoginAction
    | LogInSuccessAction
    | LogInFailureAction
    | LogoutAction
    | ModifyAction;