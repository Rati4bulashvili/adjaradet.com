import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as accountActions from '../store/auth/auth.actions'
import { Subject } from 'rxjs';
import { AppState } from '../store/app/app.reducer';

@Injectable({
  providedIn: 'root'
})

export class AccountService{

  displayModal = new Subject<{displayModal: boolean, purpose: string}>()

  toggleModal(displayModal: boolean, purpose: string){
    this.displayModal.next({displayModal: displayModal, purpose: purpose});
  }

  constructor(
    private store: Store<AppState>, 
  ) { 
  }

  autoLogIn(){
    const userData = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return
    }
    this.store.dispatch(new accountActions.ChangeUser({email: userData.email, password: userData.password}))
  }
  
  message = new Subject<{message: string, error: boolean}>();

}

