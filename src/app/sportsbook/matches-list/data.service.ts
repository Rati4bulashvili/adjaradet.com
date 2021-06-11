import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Match } from 'src/app/shared/models/match-details.model';

@Injectable({
  providedIn: 'root' 
})
export class DataService {

  constructor(private http: HttpClient) { }

  returnSpecificMatches(sport: string){
    switch (sport) {
      case 'NBA':
        return this.NBAMatches;
      case 'UFC':
        return this.UFCMatches;
      case 'UEFA':
        return this.UEFAMatches;

      default:
        break;
    }
  }

  fetchMatches(){
    return this.http.get<{[key: string]: Match}>('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map(responseData => {
      const postsArr = [];
      for(const key in responseData){
        postsArr.push(responseData[key]);
      }
      return postsArr;
    })
    )
  }

  organiseMatchesData(matches: Match[][]){ 
    this.NBAMatches = matches[0];
    this.UFCMatches = matches[1];
    this.UEFAMatches = matches[2];

    return {nbaMatches: this.NBAMatches, ufcMatches: this.UFCMatches, uefaMatches: this.UEFAMatches}
  }
  
  NBAMatches: Match[] = []
  UFCMatches: Match[] = []
  UEFAMatches: Match[] = []

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

  calculatePossWinAndOdd(input: HTMLInputElement, matches: Match[]){

    let possWin: number;
    let combinedOdd: number;

    matches.forEach((match, i) => {
      let odd: number; 

      if(match.bettingOn === 'away'){
        odd = match.awayOdd;
      }
      else if(match.bettingOn === 'home'){
        odd = match.homeOdd;
      }

      if(i === 0){
        combinedOdd = odd;
      }
      else if(i > 0){
        combinedOdd *= odd;
        combinedOdd = Math.round(combinedOdd * 100) / 100;
      }
      
      possWin = +input.value * combinedOdd;
      possWin = Math.round(possWin * 100) / 100;
    });
    return {posswin: possWin, odd: combinedOdd};
  }

  returnPossWin(input: HTMLInputElement, matches: Match[]){
    
    const betData = this.calculatePossWinAndOdd(input, matches);
    
    let betCanBePlaced: boolean;
    if(betData.posswin > 0){
      betCanBePlaced = true;
    }
    else{
      betCanBePlaced = false;
    }
    
    return {odd: betData.odd, possWin: betData.posswin, betCanBePlaced: betCanBePlaced}
  }

  newMatch = new Subject<Match>()
  betWasPlaced = new Subject<void>();
  placeBet(){
    this.betWasPlaced.next();
  }
  
  idForMatchRemove = new Subject<number>();
  removeMatch(id: number){
    this.idForMatchRemove.next(id)
  }

  checkMatchIdentity(newMatch: Match, matches: Match[]){

    if(matches.length > 0){
      let matchCanBeAdded = true;
      for (const match of matches) {

        if(match.home === newMatch.home && match.away === newMatch.away){
          matchCanBeAdded = false;
          matches.splice(matches.indexOf(match), 1);
          if(match.bettingOn !== newMatch.bettingOn){
            matches.push(newMatch);
            matches = matches.slice();
            return matches;
          }
          matches = matches.slice();
          return matches;
        }
      }
      if(matchCanBeAdded){
        matches.push(newMatch)
        matches = matches.slice();
        return matches;
      }
    }
    else{
      matches.push(newMatch);
      matches = matches.slice();
      return matches;
    }
  }
  
}
