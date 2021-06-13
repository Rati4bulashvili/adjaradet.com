import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Match } from '../../shared/models/match.model';

@Injectable({
  providedIn: 'root' 
})
export class DataService {

  constructor() { }

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
