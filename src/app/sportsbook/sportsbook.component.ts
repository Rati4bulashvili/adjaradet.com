import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { AccountData } from '../shared/models/account-data.model';
import { AppState } from '../shared/store/app/app.reducer';
import { CanComponentDeactivate } from '../shared/guards/can-deactivate-guard.service';
import * as fromAccountData from '../navbar/store/account-data/account-data.selectors'

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
    if(this.placingBet){
      return confirm('Do You Want To Stop Placing Bet?')
    }
    else{
      return true;
    }
  }  

  placingBet: boolean;
  private subs = new SubSink();

  ngOnInit(){
    this.subs.sink = this.store.select(fromAccountData.getPlacingBetState).subscribe(placingBet=>{
      this.placingBet = placingBet
    })
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}


