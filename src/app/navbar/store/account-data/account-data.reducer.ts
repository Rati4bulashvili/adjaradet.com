import { Action, createReducer, on } from "@ngrx/store";
import { AccountData } from "../../../shared/models/account-data.model";
import * as accountDataActions from './account-data.actions'

const initialState: AccountData = null;

const AccountDataReducer = createReducer(
    initialState,
    on(accountDataActions.UpdateBalance, (state, action) => ({ ...state, balance: action.balance})),
    on(accountDataActions.UpdateBetPlacingState, (state, action) => ({...state, placingBet: action.betIsGettingPlaced})),
    on(accountDataActions.UpdateBetsHistory, (state, action) => ({...state, betsHistory: action.betsHistory})),
    on(accountDataActions.LogOut, () => (null))

);

export function reducer(state: AccountData = initialState, action: Action) {
    return AccountDataReducer(state, action);
}


