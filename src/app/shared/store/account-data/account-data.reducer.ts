import { AccountData } from "../../models/account-data.model";
import * as accountDataActions from './account-data.actions'

const currentState: AccountData = null;

export function AccountDataReducer(state: AccountData = currentState, action: accountDataActions.accountActionTypes){

    switch(action.type){
        case accountDataActions.UPDATE_BALANCE:
            return {
                ...state, 
                balance: action.payload.balance
            }
        case accountDataActions.UPDATE_PLACINGBET:
            return {
                ...state,
                placingBet: action.payload
            }
        case accountDataActions.UPDATE_BETS_HISTORY:
            return {
                ...state,
                betsHistory: action.payload.betsHistory
            }
        case accountDataActions.LOG_OUT:
            return null

        default: 
            return state;  
    }
} 
