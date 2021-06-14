import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AllSportsMatches } from './shared/models/all-sports-matches.model';
import { AccountService } from './shared/services/account.service';
import { AppState } from './shared/store/app/app.reducer';
import * as matchesActions from './sportsbook/matches-list/store/matches/matches.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'adjaradet';
  matches: AllSportsMatches

  constructor(
    private accountService: AccountService,
    private TranslateService: TranslateService,
    private store: Store<AppState>
  ) {
    this.TranslateService.setDefaultLang('en')
    this.TranslateService.use(localStorage.getItem('language') || 'en')
  }

  ngOnInit(){
    this.accountService.autoLogIn();

    this.store.dispatch(new matchesActions.GetMatches())

    this.store.select('matches').subscribe((accountData) => {
      this.matches = accountData;
    })
  }


}
