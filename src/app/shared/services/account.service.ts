import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as accountActions from '../../navbar/store/auth/auth.actions'
import { Subject } from 'rxjs';
import { AppState } from '../store/app/app.reducer';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as AuthActions from '../../navbar/store/auth/auth.actions';
import { FullBet } from '../models/full-bet.model';
import * as AccountDataActions from '../../navbar/store/account-data/account-data.actions'
import { Auth } from '../models/auth.model';

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
    private http: HttpClient, 
  ) { }

  autoLogIn(){
    const userData = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return
    }
    this.store.dispatch(accountActions.ChangeUser({email: userData.email, password: userData.password}))
  }
  
  message = new Subject<{message: string, error: boolean}>();

  loginRequest<AuthResponse>(authData: Auth){
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChqR-cUB1DmNV5sGf77yrpdeu0_gNa-LY',
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }
    )
  }

  registerRequest<AuthResponse>(authData: Auth){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChqR-cUB1DmNV5sGf77yrpdeu0_gNa-LY',
    {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
  }

  addBalanceInDB(email: string, balance: number){
    return this.http.post('https://balances-933a3-default-rtdb.europe-west1.firebasedatabase.app/balances.json', 
    {
      email: email,
      balance: balance
    })
  }

  getmatches(){
    return this.http.get('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
  }

  getBalanceRequest(){
    return this.http.get('https://balances-933a3-default-rtdb.europe-west1.firebasedatabase.app/balances.json')
  }

  updateBalanceInDB(postsArr: {balance: number, email: string}[], userData: {email: string, balance: number, loggingIn: boolean}){
    postsArr.forEach((specificUser, i) => {
      if(specificUser.email === userData.email && specificUser.balance !== userData.balance){
        postsArr[i].balance = userData.balance;
        return this.http.put('https://balances-933a3-default-rtdb.europe-west1.firebasedatabase.app/balances.json', 
        postsArr).subscribe(()=>{
        }, () => {
          this.message.next({message: 'something went wrong, Check your connection', error: true})
        })
      }
    });
  }

  updateBetsHistoryInDB(placedBet: FullBet, userData: {betsHistory: FullBet[], email: string, loggingIn: boolean}){
    return this.http.post('https://bets-history-default-rtdb.europe-west1.firebasedatabase.app/bets-history.json', 
    {
      email: userData.email,
      bet: placedBet
    }).subscribe(()=> {
    },()=>{
      this.message.next({message: 'something went wrong, Check your connection', error: true})
    })
  }

  getBetsHistoryRequest(){
    return this.http.get('https://bets-history-default-rtdb.europe-west1.firebasedatabase.app/bets-history.json')
  }

  handleError = (error: HttpErrorResponse) => {
    let errorMessage: string;
    if(!error.error.error) {
      errorMessage = "An error ocurred, Please try again later";
    }
    else{
      errorMessage = error.error.error.message
    }
    this.message.next({message: errorMessage, error: true})    
  };

}

