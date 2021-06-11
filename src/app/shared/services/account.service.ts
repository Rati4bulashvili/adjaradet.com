import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Store } from '@ngrx/store';
import * as accountActions from '../store/auth/auth.actions'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Auth } from '../models/auth.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class AccountService{

  displayModal = new Subject<{displayModal: boolean, purpose: string}>()

  toggleModal(displayModal: boolean, purpose: string){
    this.displayModal.next({displayModal: displayModal, purpose: purpose});
  }

  constructor(
    private store: Store<{auth: Auth}>, 
  ) { 
  }

  autoLogIn(){
    const userData = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return
    }
    this.store.dispatch(new accountActions.ChangeUser({email: userData.email, password: userData.password}))
  }
  

}

