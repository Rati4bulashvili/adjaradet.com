import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Match } from "../shared/models/match-details.model";

@Injectable({
    providedIn: 'root'
})

export class ButtonHighlightService {

  highlightButtons = new Subject<Match[]>();
  matches: Match[] = [];
  
  formHighlightData(matches: Match[]){
    this.matches = [...matches]

    this.matches.forEach((match, i: number) => {
      this.matches[i] = {away: match.away, home: match.home, bettingOn: match.bettingOn}
    });
    
    this.highlightButtons.next(this.matches)
  }



}