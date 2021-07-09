import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ModalPurpose } from '../shared/enums/modal-purpose.enum';
import { AccountData } from '../shared/models/account-data.model';
import { AccountService } from '../shared/services/account.service';
import * as AccountDataActions from './store/account-data/account-data.actions'
import { AppState } from '../shared/store/app/app.reducer';
import * as AuthActions from './store/auth/auth.actions';
import * as fromAuthStore from '../navbar/store/auth/auth.selectors'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {

  changeLanguage(GeorgianIsSelected: boolean) {
    if (GeorgianIsSelected) {
      localStorage.setItem('language', 'ge');
    }
    else {
      localStorage.setItem('language', 'en');
    }
    window.location.reload();
  }

  constructor(
    private accountService: AccountService,
    private store: Store<AppState>,
  ) {}

  showMessage = false;
  messageData: { message: string, error: boolean, state: string }

  autoCancelMessage(message: { message: string, error: boolean, state: string }) {

    interval(5000).pipe(take(1))
    .subscribe(() => {
      this.messageData = { message: message.message, error: message.error, state: 'inactive' }
      interval(1000).pipe(take(1))
        .subscribe(() => {
          this.showMessage = false;
        })
    })
  }

  accountData: AccountData;
  email: string;
  loggedOut = false;
  language: string;
  counter = 0;
  modalpurpose: { login: string, register: string }

  ngOnInit(): void {

    this.subs.sink = this.store.select(fromAuthStore.getMailState).subscribe(email => {
      this.email = email;

      if (email) {
        this.counter = 0;
      }

      if (email && this.counter === 0) {
        this.store.dispatch(AccountDataActions.GetBalanceData({ email: email, loggingIn: true }))
        this.store.dispatch(AccountDataActions.GetBetsHistory({ email: email, loggingIn: true }))
        this.counter++;
      }

      this.modalpurpose = ModalPurpose;
    });

    this.language = localStorage.getItem('language') || 'en';

    // this.subs.sink = this.store.select('auth').subscribe(authData => {
    //   this.authData = authData;

    //   if (!authData?.email) {
    //     this.counter = 0;
    //   }

    //   if (authData && this.counter === 0) {
    //     this.store.dispatch(AccountDataActions.GetBalanceData({ email: authData.email, loggingIn: true }))
    //     this.store.dispatch(AccountDataActions.GetBetsHistory({ email: authData.email, loggingIn: true }))
    //     this.counter++;
    //   }

    //   this.modalpurpose = ModalPurpose;
      
    // });

    this.subs.sink = this.store.select('accountData').subscribe(accountData => {
      this.accountData = accountData;
    });

    this.subs.sink = this.accountService.message.subscribe((message: { message: string, error: boolean, state: string }) => {

      if (!this.showMessage) {
        this.messageData = { message: message.message, error: message.error, state: 'active' }
        this.showMessage = true;
        this.autoCancelMessage(message);
      }
      else {
        const notifier = new Subject<void>();
        interval(2500).pipe(takeUntil(notifier))
        .subscribe(() => {
          if (!this.showMessage) {
            this.messageData = { message: message.message, error: message.error, state: 'active' }
            this.showMessage = true;
            this.autoCancelMessage(message);
            notifier.next()
          }
        })
      }
    })
  }

  private subs = new SubSink();
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onOpenModal(purpose: string) {
    this.accountService.toggleModal(true, purpose);
  }

  onLogOut() {
    this.loggedOut = true;
    this.store.dispatch(AuthActions.LogOut())
  }

}
