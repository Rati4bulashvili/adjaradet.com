import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FullBet } from 'src/app/shared/models/full-bet.model';
import { SubSink } from 'subsink';
import { AppState } from '../shared/store/app/app.reducer';

@Component({
  selector: 'app-bets-history',
  templateUrl: './bets-history.component.html',
  styleUrls: ['./bets-history.component.scss']
})
export class BetsHistoryComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>){}
  
  betsHistory: FullBet[]= [];

  private subs = new SubSink();
  ngOnInit(): void {

    this.subs.sink = this.store.select('accountData').subscribe((accountData) => {
      this.betsHistory = accountData?.betsHistory;
    })
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
