import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountData } from 'src/app/shared/models/account-data.model';
import { Auth } from 'src/app/shared/models/auth.model';
import { AppState } from 'src/app/shared/store/app/app.reducer';
import * as accountDataActions from '../../store/account-data/account-data.actions'

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  @Input() authData: Auth;
  @Input() accountData: AccountData;
  @Input() language: string;
  @ViewChild('password') password: ElementRef;

  checkForEnter(pressedKey: string, moneyAmount: HTMLInputElement){
    if(pressedKey === 'Enter'){
      this.addMoney(moneyAmount)
    }
  }
  
  addMoney(moneyAmount: HTMLInputElement){
    this.store.dispatch(accountDataActions.UpdateBalance({email: this.authData.email, balance: this.accountData.balance + +moneyAmount.value, loggingIn: false}));
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
