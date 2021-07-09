import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bet } from '../../sportsbook/bet-details.model';
import { Match } from '../models/match.model';
import * as accountDataActions from '../../navbar/store/account-data/account-data.actions'
import { Subject } from 'rxjs';
import { Auth } from '../models/auth.model';
import { AccountData } from '../models/account-data.model';
import { AppState } from '../store/app/app.reducer';
import { AccountService } from './account.service';
import * as fromAuthStore from '../../navbar/store/auth/auth.selectors'

@Injectable({
  providedIn: 'root'
})

export class BetDetailsService{

  betCanNotBePlaced = new Subject<void>();
  email: string;
  accountData: AccountData;

  constructor(
    private store: Store<AppState>,
    private accountService: AccountService,
  ){
    this.store.select(fromAuthStore.getMailState).subscribe(email =>{
      this.email = email;
    })
    this.store.select('accountData').subscribe((accountData)=>{
      this.accountData = accountData;
    })
  }

  createBet(matchesDetails: Match[], betDetails: Bet){
    if(this.checkBalance(betDetails.betAmount)){
      let bets = Object.assign([], this.accountData.betsHistory);
      bets.push({betDetails: betDetails, matchDetails: matchesDetails})
      this.store.dispatch(accountDataActions.UpdateBetsHistory({email: this.email, betsHistory: bets, loggingIn: false}))
      return true;
    }
    else{
      this.betCanNotBePlaced.next();  
      this.accountService.message.next({message: 'Not Enough Money On Your Account', error: true})
      return false;
    }
  }

  checkBalance(betAmount: number){
    if(this.accountData.balance < betAmount){
      return false;
    }
    else{
      return true;
    }
  }

}
