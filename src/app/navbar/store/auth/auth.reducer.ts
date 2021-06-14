import { Auth } from "src/app/shared/models/auth.model"
import * as AccountActions from './auth.actions'

const currentState: Auth = null;

export function AuthReducer(state: Auth = currentState, action: AccountActions.AuthActionTypes){

    switch(action.type){
        case AccountActions.CHANGE_USER:
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password
            }            
        case AccountActions.LOG_OUT:
            return null;
        default: 
            return state;  
    }
} 
