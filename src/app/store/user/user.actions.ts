import { Action } from '@ngrx/store';

export enum UserActionTypes {
    LOGIN = '[User] Login',
    LOGOUT = '[User] Logout',
    MODIFY = '[User] Modify',
}

export class Login implements Action {
    readonly type = UserActionTypes.LOGIN;
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = UserActionTypes.LOGOUT;
}

export class Modify implements Action {
    readonly type = UserActionTypes.MODIFY;
    constructor(public payload: any) {}
}

export type UserActions =
    | Login
    | Logout
    | Modify;