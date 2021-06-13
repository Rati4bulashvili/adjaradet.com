import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Effect, ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { Match } from "../../models/match.model";
import { AccountService } from "../../services/account.service";
import * as matchesActions from '../matches/matches.actions'

@Injectable()
export class MatchesEffects{

  @Effect()
  getMatches = this.actions.pipe( 
    ofType(matchesActions.GET_MATCHES),
      
    switchMap((matchesData: matchesActions.GetMatches) => {

      return this.http.get('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
        const postsArr = [];
        for(const key in responseData){
          postsArr.push(responseData[key]);
        }
        return new matchesActions.UpdateMatches(this.organiseMatchesData(postsArr))
      }),
        catchError(error => {
          return of(this.handleError(error))
        })
      )
    })
  );

  organiseMatchesData(matches: Match[][]){ 
    let NBAMatches = matches[0];
    let UFCMatches = matches[1];
    let UEFAMatches = matches[2];

    return {nbaMatches: NBAMatches, ufcMatches: UFCMatches, uefaMatches: UEFAMatches}
  }

  handleError = (error: HttpErrorResponse) => {
    let errorMessage: string;
    if(!error.error.error) {
      errorMessage = "An error ocurred, Please try again later";
    }
    else{
      errorMessage = error.error.error.message
    }
    this.accountService.message.next({message: errorMessage, error: true})    
  };

  constructor(
    private actions: Actions,
    private http: HttpClient,
    private accountService: AccountService
  ){}
}