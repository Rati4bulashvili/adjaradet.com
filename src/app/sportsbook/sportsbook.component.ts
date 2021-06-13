import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { AccountData } from '../shared/models/account-data.model';
import { AppState } from '../shared/store/app/app.reducer';
import { CanComponentDeactivate } from '../shared/guards/can-deactivate-guard.service';

@Component({
  selector: 'app-sportsbook',
  templateUrl: './sportsbook.component.html',
  styleUrls: ['./sportsbook.component.scss']
})

export class SportsbookComponent implements OnInit, CanComponentDeactivate, OnDestroy{

  constructor(
    private store: Store<AppState>
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


