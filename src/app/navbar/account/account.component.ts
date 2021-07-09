import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountData } from 'src/app/shared/models/account-data.model';
import { Auth } from 'src/app/shared/models/auth.model';
import { AppState } from 'src/app/shared/store/app/app.reducer';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit, OnDestroy {
  
  constructor(
    private store: Store<AppState>
  ) {}
    
  authData: Auth;
  accountData: AccountData;
  language: string;
  private subs = new SubSink();

  ngOnInit(): void {
    this.language = localStorage.getItem('language');

    this.subs.sink = this.store.select('auth').subscribe((authData)=>{
      this.authData = authData;
    })

    this.subs.sink = this.store.select('accountData').subscribe((accountData)=>{
      this.accountData = accountData;
    })
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }



}
