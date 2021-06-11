import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AccountData } from 'src/app/shared/models/account-data.model';
import { Account } from 'src/app/shared/models/account.model';
import { Auth } from 'src/app/shared/models/auth.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { SubSink } from 'subsink';
import * as accountDataActions from '../../shared/store/account-data/account-data.actions'

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit, OnDestroy {

  @ViewChild('password') password: ElementRef;

  constructor(
    private store: Store<{auth: Auth, accountData: AccountData}>
  ) { }

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

  checkForEnter(e, moneyAmount: HTMLInputElement){
    if(e.key === 'Enter'){
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
