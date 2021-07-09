import { Injectable } from "@angular/core";
import { createEffect, ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { Match } from "../../../../shared/models/match.model";
import { AccountService } from "../../../../shared/services/account.service";
import * as matchesActions from './matches.actions'

@Injectable()
export class MatchesEffects{


  getMatches = createEffect(() =>
  this.actions.pipe(
    ofType(matchesActions.GET_MATCHES),
    switchMap(() => {
      return this.accountService.getmatches()
      .pipe(        
        map(responseData => {
          const postsArr = [];//type
          for(const key in responseData){
            postsArr.push(responseData[key]);
          }
          return matchesActions.UpdateMatches(this.organiseMatchesData(postsArr))
        },
        catchError(error => {
          return of(this.accountService.handleError(error))
        }))
      );
    })
  ));

  organiseMatchesData(matches: Match[][]){ 
    let NBAMatches = matches[0];
    let UFCMatches = matches[1];
    let UEFAMatches = matches[2];

    return {nbaMatches: NBAMatches, ufcMatches: UFCMatches, uefaMatches: UEFAMatches}
  }



  constructor(
    private actions: Actions,
    private accountService: AccountService
  ){}
}