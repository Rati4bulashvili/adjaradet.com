import { Component, OnDestroy, OnInit,} from '@angular/core';
import { ButtonHighlightService } from '../button-highlight.service'
import { Match } from 'src/app/shared/models/match-details.model';
import { DataService } from '../matches-list/data.service';
import { BetDetailsService } from 'src/app/shared/services/bet-details.service';
import { SubSink } from 'subsink'

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})

export class TicketComponent implements OnInit, OnDestroy{

  possWin: number;
  matches: Match[] = [];

  constructor(
  private dataService: DataService,
  private buttonHighlightService: ButtonHighlightService,
  private betDetailsService: BetDetailsService) { }

  checkMatchIdentity(newMatch: Match){
    this.matches = this.dataService.checkMatchIdentity(newMatch, this.matches)
  }

  ngOnInit(){
    
    this.buttonHighlightService.formHighlightData(this.matches)

    this.subs.sink = this.dataService.newMatch.subscribe((newMatch) => {
      this.checkMatchIdentity(newMatch);
      this.buttonHighlightService.formHighlightData(this.matches)
    })
    
    this.subs.sink = this.dataService.betWasPlaced.subscribe(() => {
      this.matches = [];
      this.buttonHighlightService.formHighlightData(this.matches)
    })
    
    this.subs.sink = this.dataService.idForMatchRemove.subscribe((id) => {
      this.matches.splice(id, 1)
      this.matches = this.matches.slice();
      this.buttonHighlightService.formHighlightData(this.matches)
    });
    
    this.subs.sink = this.betDetailsService.betCanNotBePlaced.subscribe(()=>{
      this.matches = [];
      this.buttonHighlightService.formHighlightData(this.matches)
    })
  }

  private subs = new SubSink();

  ngOnDestroy(){
    this.subs.unsubscribe;
  }

}
