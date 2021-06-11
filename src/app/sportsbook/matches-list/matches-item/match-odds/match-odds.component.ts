import { Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Match } from 'src/app/shared/models/match-details.model';
import { ButtonHighlightService } from '../../../button-highlight.service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-match-odds',
  templateUrl: './match-odds.component.html',
  styleUrls: ['./match-odds.component.scss']
})

export class MatchOddsComponent implements OnInit{

  constructor(public dataService: DataService, private buttonHighlightService: ButtonHighlightService) { }

  @ViewChild('home') homeBtn: ElementRef;
  @ViewChild('away') awayBtn: ElementRef;
  highlightsArr = [];

  ngOnInit(): void {
    
    this.buttonHighlightService.highlightButtons.subscribe((matchesInBet: Match[])=>{
      this.highlightsArr = matchesInBet;
    })
  }

  @Input() match: {home: string, away: string, homeOdd: number, awayOdd: number};

  addToBet(bettingOn: string){
    this.dataService.newMatch.next({home: this.match.home, away: this.match.away, awayOdd: this.match.awayOdd, homeOdd: this.match.homeOdd, bettingOn: bettingOn})
  }

}





