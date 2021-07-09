import { HttpErrorResponse } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import * as AuthActions from './auth.actions';
import * as AccountDataActions from '../account-data/account-data.actions';
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { AccountService } from "../../../shared/services/account.service";
import { Auth } from "src/app/shared/models/auth.model";

interface AuthResponse{
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


  login = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((userData: Auth) => {
        return this.accountService.loginRequest<AuthResponse>(userData)
        .pipe(
          map((resData) => {
            if(this.language === 'ge'){
              this.accountService.message.next({message: `გამარჯობა ${resData.email}`, error: false})
            }else{
              this.accountService.message.next({message: `welcome ${resData.email}`, error: false})
            }
  
            localStorage.setItem('userData', JSON.stringify({email: userData.email, password: userData.email}))
            return AuthActions.ChangeUser({email: resData.email, password: userData.password})            
          },
          catchError(error => {
            return of(this.handleError(error))
          }))
        );
      })
    )
  );

  register = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((userData: Auth) => {
        return this.accountService.loginRequest<AuthResponse>(userData)
        .pipe(
          map((resData) => {
            if(this.language === 'ge'){
              this.accountService.message.next({message: `გამარჯობა ${resData.email}`, error: false})
            }else{
              this.accountService.message.next({message: `welcome ${resData.email}`, error: false})
            }
  
            localStorage.setItem('userData', JSON.stringify({email: userData.email, password: userData.password}))
            return AuthActions.ChangeUser({email: resData.email, password: userData.password})            
          },
          catchError(error => {
            return of(this.handleError(error))
          }))
        );
      })
    )
  );

  logout = createEffect(
    () => this.actions.pipe(
      ofType(AuthActions.LOG_OUT),
      map(() => {
        localStorage.setItem('userData', null)
        this.accountService.message.next({message: 'Logged Out', error: false});
        return AccountDataActions.LogOut()
      })
    )
  );

  language: string;

  constructor(
    private actions: Actions,
    private accountService: AccountService,
  ){
    this.language = localStorage.getItem('language');
  }

}