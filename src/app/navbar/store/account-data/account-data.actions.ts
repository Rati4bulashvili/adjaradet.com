import { Action } from "@ngrx/store";
import { FullBet } from "../../../shared/models/full-bet.model";

export const GET_BALANCE_DATA = '[account data] GET_BALANCE_DATA';
export const UPDATE_BALANCE = '[account data] UPDATE_BALANCE';
export const GET_BETS_HISTORY = '[account data] GET_BETS_HISTORY';
export const UPDATE_BETS_HISTORY = '[account data] UPDATE_BETS_HISTORY';
export const UPDATE_PLACINGBET = '[account data] UPDATE_PLACINGBET';
export const LOG_OUT = '[account data] LOG_OUT';

export class GetBalanceData implements Action {
    readonly type = GET_BALANCE_DATA;
    constructor(public payload: {email: string, loggingIn: boolean}){
    }
}

export class UpdateBalance implements Action {
    readonly type = UPDATE_BALANCE;
    constructor(public payload: {email: string, balance: number, loggingIn: boolean}){}
}

export class GetBetsHistory implements Action {
    readonly type = GET_BETS_HISTORY;
    constructor(public payload: {email: string, loggingIn: boolean}){}
}

export class UpdateBetsHistory implements Action {
    readonly type = UPDATE_BETS_HISTORY; 
    constructor(public payload: {betsHistory: FullBet[], email: string, loggingIn: boolean}){}
}

export class UpdateBetPlacingState implements Action {
    readonly type = UPDATE_PLACINGBET;
    constructor(public payload: boolean){}
}

export class LogOut implements Action {
    readonly type = LOG_OUT;
}

export type accountActionTypes = 
    | UpdateBetPlacingState
    | UpdateBetsHistory
    | UpdateBalance
    | GetBalanceData
    | LogOut

