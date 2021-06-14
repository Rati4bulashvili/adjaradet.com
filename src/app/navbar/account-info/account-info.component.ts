import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountData } from 'src/app/shared/models/account-data.model';
import { Auth } from 'src/app/shared/models/auth.model';
import { AppState } from 'src/app/shared/store/app/app.reducer';
import { SubSink } from 'subsink';
import * as accountDataActions from '../store/account-data/account-data.actions'

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})

export class AccountInfoComponent implements OnInit, OnDestroy {
  
  constructor(
    private store: Store<AppState>
  ) {}
    
  @ViewChild('password') password: ElementRef;
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

  checkForEnter(pressedKey: string, moneyAmount: HTMLInputElement){
    if(pressedKey === 'Enter'){
      this.addMoney(moneyAmount)
    }
  }
  
  addMoney(moneyAmount: HTMLInputElement){
    this.store.dispatch(new accountDataActions.UpdateBalance({email: this.authData.email, balance: this.accountData.balance + +moneyAmount.value, loggingIn: false}));
    moneyAmount.value = '';
  }

  toggleVisibility() {
    if (this.password.nativeElement.type === "password") {
      this.password.nativeElement.type = "text";
    } else {
      this.password.nativeElement.type = "password";
    }
  }
}
