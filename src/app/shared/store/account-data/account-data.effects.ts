import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap} from "rxjs/operators";
import * as AccountDataActions from './account-data.actions'
import { of } from "rxjs";
import { Injectable, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { MessageService } from "../../services/message.service";
import { FullBet } from "../../models/full-bet-details.model";
import { Auth } from "../../models/auth.model";
import { AccountData } from "../../models/account-data.model";

@Injectable()
export class AccountDataEffects {

  handleError = (error: HttpErrorResponse) => {
    let errorMessage: string;
    if(!error.error.error) {
      errorMessage = "An error ocurred, Please try again later";
    }
    else{
      errorMessage = error.error.error.message
    }
    this.MessageService.message.next({message: errorMessage, error: true})    
  };

  @Effect()
  getBalance = this.actions.pipe( 
    ofType(AccountDataActions.GET_BALANCE_DATA),

    switchMap((userData: AccountDataActions.GetBalanceData) => {
      return this.http.get('https://balances-933a3-default-rtdb.europe-west1.firebasedatabase.app/balances.json')
      .pipe(
        map((balanceData) => {
          let userBalance: number;
          const postsArr = [];
          
          for(const key in balanceData){
            if(balanceData[key].email === userData.payload.email){
              userBalance = balanceData[key].balance
              postsArr.push(balanceData[key]);
            }
          }
          return new AccountDataActions.UpdateBalance({email: userData.payload.email, balance: userBalance, loggingIn: userData.payload.loggingIn})
        }),
        catchError(error => {
          return of(this.handleError(error))
        })
      )
    })
  );

  @Effect({dispatch: false})
  updateBalance = this.actions.pipe( 
    ofType(AccountDataActions.UPDATE_BALANCE),

    switchMap((userData: AccountDataActions.UpdateBalance) => {
      return this.http.get('https://balances-933a3-default-rtdb.europe-west1.firebasedatabase.app/balances.json')
      .pipe(
        map((balanceData) => {
          const postsArr = [];
          for(const key in balanceData){
            postsArr.push(balanceData[key]);
          }

          if(!userData.payload.loggingIn){

            if(this.language !== 'ge'){
              this.MessageService.message.next({message: `transaction successful! your balance: ${userData.payload.balance}$`, error: false})
            }
            else{
              this.MessageService.message.next({message: `ტრანზაქცია წარმატებულია! თქვენი ანგარიში: ${userData.payload.balance}$`, error: false})
            }
            this.updateBalanceInDB(postsArr, userData)
          }
        }),
        catchError(error => {
          return of(this.handleError(error))
        })
      )
    })
  );

  updateBalanceInDB(postsArr, userData){
    postsArr.forEach((specificUser, i) => {
      if(specificUser.email === userData.payload.email && specificUser.balance !== userData.payload.balance){
        postsArr[i].balance = userData.payload.balance;
        return this.http.put('https://balances-933a3-default-rtdb.europe-west1.firebasedatabase.app/balances.json', 
        postsArr).subscribe(()=>{
        }, () => {
          this.MessageService.message.next({message: 'something went wrong, Check your connection', error: true})
        })
      }
    });
  }

  @Effect()
  getBetsHistory = this.actions.pipe( 
    ofType(AccountDataActions.GET_BETS_HISTORY),
    
    switchMap((userData: AccountDataActions.GetBetsHistory) => {
      return this.http.get('https://bets-history-default-rtdb.europe-west1.firebasedatabase.app/bets-history.json')
      .pipe(
        map((betsHistoryOfEveryone) => {
          const betsHistoryOfActiveUser: FullBet[] = [];
          for(const key in betsHistoryOfEveryone){
            if(betsHistoryOfEveryone[key].email === userData.payload.email){
              betsHistoryOfActiveUser.push(betsHistoryOfEveryone[key].bet);
            }
          }
          return new AccountDataActions.UpdateBetsHistory({betsHistory: betsHistoryOfActiveUser, email: userData.payload.email, loggingIn: userData.payload.loggingIn})
        }),
        catchError(error => {
          return of(this.handleError(error))
        })
      )
    })
  );

  @Effect()
  updateBetsHistory = this.actions.pipe( 
    ofType(AccountDataActions.UPDATE_BETS_HISTORY),

    switchMap((userData: AccountDataActions.UpdateBetsHistory) => {

      return this.http.get('https://bets-history-default-rtdb.europe-west1.firebasedatabase.app/bets-history.json')
      .pipe(
        map((betsHistoryData) => {
          const postsArr = [];
          for(const key in betsHistoryData){
            postsArr.push(betsHistoryData[key]);
          }

          if(!userData.payload.loggingIn){
            let placedBet: FullBet = userData.payload.betsHistory[userData.payload.betsHistory.length-1]
            this.updateBetsHistoryInDB(placedBet, userData)
            this.MessageService.message.next({message: `Your Bet Was Placed`, error: false})
            return new AccountDataActions.UpdateBalance({email: this.authData.email, balance: this.accountData.balance - placedBet.betDetails.betAmount, loggingIn: userData.payload.loggingIn})/////////////////////////////////////
          }
          else{
            return { type: 'DUMMY' };
          }
        }),
        catchError(error => {
          return of(this.handleError(error))
        })
      )
    })
  );
		
  updateBetsHistoryInDB(placedBet: FullBet, userData: AccountDataActions.UpdateBetsHistory){
    return this.http.post('https://bets-history-default-rtdb.europe-west1.firebasedatabase.app/bets-history.json', 
    {
      email: userData.payload.email,
      bet: placedBet
    }).subscribe(()=> {
    },error=>{
      return of(this.handleError(error))
    })
  }

  authData: Auth;
  accountData: AccountData;
  language: string;
  constructor(
    private actions: Actions,
    private http: HttpClient, 
    private store: Store<{auth: Auth, accountData: AccountData}>,
    private MessageService: MessageService
  ){
    this.store.select('auth').subscribe(authData => {
      this.authData = authData;
    })
    this.store.select('accountData').subscribe(accountData => {
      this.accountData = accountData;
    })
    this.language = localStorage.getItem('language');
  }

}