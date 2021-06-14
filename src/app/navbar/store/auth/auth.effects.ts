import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import * as AuthActions from './auth.actions';
import * as AccountDataActions from '../account-data/account-data.actions';
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { AccountService } from "../../../shared/services/account.service";

interface authResponse{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects{

  handleError = (error: HttpErrorResponse) => {
    let errorMessage: string;
    if(!error.error.error) {
      errorMessage = "An error ocurred, Please try again later";
    }
    else{
      switch (error.error.error.message) {
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is invalid';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This Email does not exist';
        case 'EMAIL_EXISTS':
          errorMessage = 'This Email already exists';
          break;
      }
    }
    this.accountService.message.next({message: errorMessage, error: true})    
  };

  @Effect()
  Login = this.actions.pipe( 
    ofType(AuthActions.LOGIN_START),
      
    switchMap((userData: AuthActions.LoginStart) => {
      return this.http.post<authResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChqR-cUB1DmNV5sGf77yrpdeu0_gNa-LY',
        {
          email: userData.payload.email,
          password: userData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(resData => { 
          if(this.language === 'ge'){
            this.accountService.message.next({message: `გამარჯობა ${resData.email}`, error: false})
          }else{
            this.accountService.message.next({message: `welcome ${resData.email}`, error: false})
          }

          localStorage.setItem('userData', JSON.stringify({email: userData.payload.email, password: userData.payload.password}))
          return new AuthActions.ChangeUser({email: resData.email, password: userData.payload.password})
        }),
        catchError(error => {
          return of(this.handleError(error))
        })
      )
    })
  );

  @Effect({dispatch:false})
  register = this.actions.pipe( 
    ofType(AuthActions.REGISTER_USER),
      
    switchMap((userData: AuthActions.LoginStart) => {
      return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChqR-cUB1DmNV5sGf77yrpdeu0_gNa-LY',
      {
        email: userData.payload.email,
        password: userData.payload.password,
        returnSecureToken: true
      }).pipe(
        map(resData => { 
          this.addBalanceInDB(resData.email, 10).subscribe(()=>{
          }, () => {
            this.accountService.message.next({message: 'An error ocurred, Please try again later', error: true})
          })
          this.accountService.toggleModal(true, 'log in')
        }),
        catchError(error => {
          return of(this.handleError(error))
        })
      )
    })
  );

  @Effect()
  logOut = this.actions.pipe( 
    ofType(AuthActions.LOG_OUT),
    map(()=> {
      localStorage.setItem('userData', null)
      this.accountService.message.next({message: 'Logged Out', error: false});
      return new AccountDataActions.LogOut()
    })    
  );

  addBalanceInDB(email: string, balance: number){
    return this.http.post('https://balances-933a3-default-rtdb.europe-west1.firebasedatabase.app/balances.json', 
    {
      email: email,
      balance: balance
    })
  }

  language: string;

  constructor(
    private actions: Actions,
    private http: HttpClient, 
    private accountService: AccountService,
  ){
    this.language = localStorage.getItem('language');
  }

}