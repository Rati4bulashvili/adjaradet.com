import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { AccountData } from '../shared/models/account-data.model';
import { Account } from '../shared/models/account.model';
import { Auth } from '../shared/models/auth.model';
import { BetDetailsService } from '../shared/services/bet-details.service';
import { CanComponentDeactivate } from './ticket/bet-place/can-deactivate-guard.service';

@Component({
  selector: 'app-sportsbook',
  templateUrl: './sportsbook.component.html',
  styleUrls: ['./sportsbook.component.scss']
})

export class SportsbookComponent implements OnInit, CanComponentDeactivate, OnDestroy{

  constructor(
    private store: Store<{accountData: AccountData}>
  ){}

  canDeactivate(){
    if(this.accountData.placingBet){
      return confirm('Do You Want To Stop Placing Bet?')
    }
    else{
      return true;
    }
  }  

  accountData: AccountData;
  private subs = new SubSink();

  ngOnInit(){

    this.subs.sink = this.store.select('accountData').subscribe(accountData=>{
      this.accountData = accountData;
    })

  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}


