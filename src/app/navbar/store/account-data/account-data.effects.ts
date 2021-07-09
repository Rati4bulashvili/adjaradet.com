import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap} from "rxjs/operators";
import * as AccountDataActions from './account-data.actions'
import { of } from "rxjs";
import { Injectable} from "@angular/core";
import { Store } from "@ngrx/store";
import { FullBet } from "../../../shared/models/full-bet.model";
import { Auth } from "../../../shared/models/auth.model";
import { AccountData } from "../../../shared/models/account-data.model";
import { AppState } from "../../../shared/store/app/app.reducer";
import { AccountService } from "../../../shared/services/account.service";
import * as fromAuthStore from '../auth/auth.selectors'
import * as fromAccountData from './account-data.selectors'

@Injectable()
export class AccountDataEffects {

  getBalance = createEffect(() =>
  this.actions.pipe(
    ofType(AccountDataActions.GET_BALANCE_DATA),
    switchMap((userData: {email: string, loggingIn: boolean}) => {
      return this.accountService.getBalanceRequest()
      .pipe(
        map((balanceData) => {
          let userBalance: number;
          const postsArr = [];
          
          for(const key in balanceData){
            if(balanceData[key].email === userData.email){
              userBalance = balanceData[key].balance
              postsArr.push(balanceData[key]);
            }
          }
          return AccountDataActions.UpdateBalance({email: userData.email, balance: userBalance, loggingIn: userData.loggingIn})
        },
        catchError(error => {
          return of(this.accountService.handleError(error))
        }))
      )
    })
  ));

  updateBalance = createEffect(() =>
  this.actions.pipe(
    ofType(AccountDataActions.UPDATE_BALANCE),
    switchMap((userData: {email: string, balance: number, loggingIn: boolean}) => {
      return this.accountService.getBalanceRequest()
      .pipe(
        map((balanceData) => {
          const postsArr = [];
          for(const key in balanceData){
            postsArr.push(balanceData[key]);
          }

          if(!userData.loggingIn){

            if(this.language !== 'ge'){
              this.accountService.message.next({message: `transaction successful! your balance: ${userData.balance}$`, error: false})
            }
            else{
              this.accountService.message.next({message: `ტრანზაქცია წარმატებულია! თქვენი ანგარიში: ${userData.balance}$`, error: false})
            }
            this.accountService.updateBalanceInDB(postsArr, userData)
          }
        },
        catchError(error => {
          return of(this.accountService.handleError(error))
        }))
      )
    })
  ), {dispatch: false});


  getBetsHistory = createEffect(() =>
  this.actions.pipe(
    ofType(AccountDataActions.GET_BETS_HISTORY),
    switchMap((userData: {email: string, balance: number, loggingIn: boolean}) => {
      return this.accountService.getBetsHistoryRequest()
      .pipe(
        map((betsHistoryOfEveryone) => {
          const betsHistoryOfActiveUser: FullBet[] = [];
          for(const key in betsHistoryOfEveryone){
            if(betsHistoryOfEveryone[key].email === userData.email){
              betsHistoryOfActiveUser.push(betsHistoryOfEveryone[key].bet);
            }
          }
          return AccountDataActions.UpdateBetsHistory({betsHistory: betsHistoryOfActiveUser, email: userData.email, loggingIn: userData.loggingIn})
        },
        catchError(error => {
          return of(this.accountService.handleError(error))
        }))
      )
    })
  ));

  updateBetsHistory = createEffect(() =>
  this.actions.pipe(
    ofType(AccountDataActions.UPDATE_BETS_HISTORY),
    switchMap((userData: {betsHistory: FullBet[], email: string, loggingIn: boolean}) => {
      return this.accountService.getBetsHistoryRequest()
      .pipe(
        map((betsHistoryData) => {
          const postsArr = [];
          for(const key in betsHistoryData){
            postsArr.push(betsHistoryData[key]);
          }

          if(!userData.loggingIn){
            let placedBet: FullBet = userData.betsHistory[userData.betsHistory.length-1]
            this.accountService.updateBetsHistoryInDB(placedBet, userData)
            this.accountService.message.next({message: `Your Bet Was Placed`, error: false})
            return AccountDataActions.UpdateBalance({email: this.email, balance: this.balance - placedBet.betDetails.betAmount, loggingIn: userData.loggingIn})/////////////////////////////////////
          }
          else{
            return { type: 'DUMMY' };
          }
        },
        catchError(error => {
          return of(this.accountService.handleError(error))
        }))
      )
    })
  ));

  email: string;
  balance: number;
  language: string;
  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private accountService: AccountService
  ){
    this.store.select(fromAuthStore.getMailState).subscribe(email => {
      this.email = email;
    })
    this.store.select(fromAccountData.getBalanceState).subscribe(balance => {
      this.balance = balance;
    })
    this.language = localStorage.getItem('language');
  }
}
