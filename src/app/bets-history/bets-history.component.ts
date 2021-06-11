import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountData } from 'src/app/shared/models/account-data.model';
import { Account } from 'src/app/shared/models/account.model';
import { Auth } from 'src/app/shared/models/auth.model';
import { FullBet } from 'src/app/shared/models/full-bet-details.model';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-bets-history',
  templateUrl: './bets-history.component.html',
  styleUrls: ['./bets-history.component.scss']
})
export class BetsHistoryComponent implements OnInit, OnDestroy {

  constructor( 
    private store: Store<{accountData: AccountData}>,
  ){    
  }
  
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
