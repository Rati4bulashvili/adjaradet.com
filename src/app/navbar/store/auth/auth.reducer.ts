import { Action, createReducer, on } from "@ngrx/store";
import { Auth } from "src/app/shared/models/auth.model"
import * as AccountActions from './auth.actions'

const initialState: Auth = null;

const AuthReducer = createReducer(
    initialState,
    on(AccountActions.ChangeUser, (state, action) => ({ ...state, email: action.email, password: action.password})),
    on(AccountActions.LogOut, () => (null))
);

export function reducer(state: Auth = initialState, action: Action) {
    return AuthReducer(state, action);
}


