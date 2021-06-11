import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Effect, ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { DataService } from "src/app/sportsbook/matches-list/data.service";
import { Match } from "../../models/match-details.model";
import * as matchesActions from '../matches/matches.actions'

@Injectable()
export class MatchesEffects{

  @Effect()
  getMatches = this.actions.pipe( 
    ofType(matchesActions.GET_MATCHES),
      
    switchMap((matchesData: matchesActions.GetMatches) => {

      return this.http.get<{[key: string]: Match}>('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
        const postsArr = [];
        for(const key in responseData){
          postsArr.push(responseData[key]);
        }
        console.log(postsArr)
        console.log(this.dataService.organiseMatchesData(postsArr));
        return new matchesActions.UpdateMatches(this.dataService.organiseMatchesData(postsArr))
      })
      )
      // return this.http.post(
      //   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChqR-cUB1DmNV5sGf77yrpdeu0_gNa-LY',
      //   {
      //     email: matchesData,
      //     password: accountData.payload.password,
      //     returnSecureToken: true, //is this needed?
      //   }
      // ).pipe(
      //   map(resData => { 

          // if(this.language === 'ge'){
          //   this.MessageService.message.next({message: `გამარჯობა ${resData.email}`, error: false})
          // }else{
          //   this.MessageService.message.next({message: `welcome ${resData.email}`, error: false})
          // }

          // localStorage.setItem('userData', JSON.stringify({email: accountData.payload.email, password: accountData.payload.password}))
          // return new AuthActions.ChangeUser({email: resData.email, password: accountData.payload.password})

        // })

        // ,
        // catchError(error => {
        //   // return of(this.handleError(error))
        // })
      // )
    })
  );

  constructor(
    private actions: Actions,
    private http: HttpClient,
    private dataService: DataService
  ){}
}