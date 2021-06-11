import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Matches } from './shared/models/matches.model';
import { AccountService } from './shared/services/account.service';
import * as matchesActions from './shared/store/matches/matches.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'adjaradet';

  constructor(
    private accountService: AccountService,
    private TranslateService: TranslateService,
    private store: Store<{matches: Matches}>
  ) {
    this.TranslateService.setDefaultLang('en')
    this.TranslateService.use(localStorage.getItem('language') || 'en')
  }

  matches: Matches
  ngOnInit(){
    this.accountService.autoLogIn();

    this.store.dispatch(new matchesActions.GetMatches())

    this.store.select('matches').subscribe((accountData) => {
      this.matches = accountData;
    })
  }


}
