import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ModalPurpose } from '../shared/enums/modal-purpose.enum';
import { AccountData } from '../shared/models/account-data.model';
import { Auth } from '../shared/models/auth.model';
import { Matches } from '../shared/models/matches.model';
import { AccountService } from '../shared/services/account.service';
import { MessageService } from '../shared/services/message.service';
import * as AccountDataActions from '../shared/store/account-data/account-data.actions'
import * as AuthActions from '../shared/store/auth/auth.actions'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {
  
  changeLanguage(GeorgianIsSelected: boolean){
    if(GeorgianIsSelected){
      localStorage.setItem('language', 'ge');
    }
    else{
      localStorage.setItem('language', 'en');
    }
    window.location.reload();
  }

  constructor(
    private accountService: AccountService,
    private store: Store<{auth: Auth, accountData: AccountData}>,
    private messageService: MessageService,
  ) {
  }
  
  modalPurpose = ModalPurpose
  showMessage = false;
  messageData: {message: string, error: boolean, state: string}
  
  autoCancelMessage(message: {message: string, error: boolean, state: string}){

    interval(5000).pipe(take(1))
    .subscribe(()=>{
      this.messageData = {message: message.message, error: message.error, state: 'inactive'}
      interval(1000).pipe(take(1))
      .subscribe(()=>{
        this.showMessage = false;
      })
    })
  }
  
  accountData: AccountData;
  authData: Auth;
  loggedOut = false;
  language: string;
  counter = 0;
  ngOnInit(): void {

    this.language = localStorage.getItem('language') || 'en';
    
    this.subs.sink = this.store.select('auth').subscribe(authData=>{
      this.authData = authData;
      
      if(!authData?.email){
        this.counter = 0;
      }

      if(authData && this.counter === 0){
        this.store.dispatch(new AccountDataActions.GetBalanceData({email: authData.email, loggingIn: true}))
        this.store.dispatch(new AccountDataActions.GetBetsHistory({email: authData.email, loggingIn: true}))
        this.counter++;
      }
    });

    this.subs.sink = this.store.select('accountData').subscribe(accountData=>{
      this.accountData = accountData;
    });

    this.subs.sink = this.messageService.message.subscribe((message: {message: string, error: boolean, state: string}) => {

      if(!this.showMessage){
        this.messageData = {message: message.message, error: message.error, state: 'active'}
        this.showMessage = true;
        this.autoCancelMessage(message);
      }
      else{
        const notifier = new Subject<void>();
        interval(2500).pipe(takeUntil(notifier))
        .subscribe(()=>{
          if(!this.showMessage){
            this.messageData = {message: message.message, error: message.error, state: 'active'}
            this.showMessage = true;
            this.autoCancelMessage(message);
            notifier.next()
          }
        })
      }
    })
  }
  
  private subs = new SubSink();
  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  onOpenModal(purpose: string){
    this.accountService.toggleModal(true, purpose);
  }

  onLogOut(){
    this.loggedOut = true;
    this.store.dispatch(new AuthActions.LogOut())
  }

}
