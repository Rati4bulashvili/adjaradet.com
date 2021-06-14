import { Action } from "@ngrx/store";
import { Auth } from "../../../shared/models/auth.model";

export const LOGIN_START = '[account] LOGIN_START';
export const CHANGE_USER = '[account] CHANGE_USER';
export const LOG_OUT = '[account] LOG_OUT';
export const REGISTER_USER = '[account] REGISTER_USER';

export class ChangeUser implements Action {
    readonly type = CHANGE_USER;
    constructor(public payload: Auth){}
}

export class LogOut implements Action {
    readonly type = LOG_OUT;
}

export class Register implements Action {
    readonly type = REGISTER_USER;
    constructor(public payload: {email: string, password: string}){}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: {email: string, password: string}){}
}


export type AuthActionTypes = 
    ChangeUser 
    | LogOut 
    | LoginStart
    | Register
    ;

