import { createAction, props } from "@ngrx/store";
import { Auth } from "src/app/shared/models/auth.model";
import { FullBet } from "../../../shared/models/full-bet.model";

export const GET_BALANCE_DATA = '[account data] GET_BALANCE_DATA';
export const UPDATE_BALANCE = '[account data] UPDATE_BALANCE';
export const GET_BETS_HISTORY = '[account data] GET_BETS_HISTORY';
export const UPDATE_BETS_HISTORY = '[account data] UPDATE_BETS_HISTORY';
export const UPDATE_PLACINGBET = '[account data] UPDATE_PLACINGBET';
export const LOG_OUT = '[account data] LOG_OUT';

export const GetBalanceData = createAction(
    GET_BALANCE_DATA,
    props<{email: string, loggingIn: boolean}>()
);


export const UpdateBalance = createAction(
    UPDATE_BALANCE,
    props<{email: string, balance: number, loggingIn: boolean}>()
);


export const GetBetsHistory = createAction(
    GET_BETS_HISTORY,
    props<{email: string, loggingIn: boolean}>()
);


export const UpdateBetsHistory = createAction(
    UPDATE_BETS_HISTORY,
    props<{betsHistory: FullBet[], email: string, loggingIn: boolean}>()
);
    


export const UpdateBetPlacingState = createAction(
    UPDATE_PLACINGBET,
    props<{betIsGettingPlaced: boolean}>()
);



export const LogOut = createAction(
    LOG_OUT
);

