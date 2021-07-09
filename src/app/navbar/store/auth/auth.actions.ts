import { createAction, props } from "@ngrx/store";
import { Auth } from "../../../shared/models/auth.model";

export const LOGIN_START = '[account] LOGIN_START';
export const CHANGE_USER = '[account] CHANGE_USER';
export const LOG_OUT = '[account] LOG_OUT';
export const REGISTER_USER = '[account] REGISTER_USER';

export const ChangeUser = createAction(
    CHANGE_USER,
    props<Auth>()
);
export const LogOut = createAction(
    LOG_OUT
);

export const Register = createAction(
    REGISTER_USER,
    props<Auth>()
);
export const LoginStart = createAction(
    LOGIN_START,
    props<Auth>()
);




