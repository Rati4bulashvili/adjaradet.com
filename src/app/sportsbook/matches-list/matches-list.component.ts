import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Match } from 'src/app/shared/models/match.model';
import { AppState } from 'src/app/shared/store/app/app.reducer';
import { SubSink } from 'subsink';
import { DataService } from './data-organise.service';
import { MatchesHeaderComponent } from './matches-header/matches-header.component'

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss']
})
export class MatchesListComponent implements AfterViewInit, OnDestroy{

  constructor( 
    public dataService: DataService,
    private store: Store<AppState>,
    private ChangeDetecotor: ChangeDetectorRef
  ) { }

  @ViewChild(MatchesHeaderComponent) HeaderComponent: MatchesHeaderComponent;
  
  ngAfterViewInit(){

    this.subs.sink = this.store.select('matches').subscribe(matches =>{

      if(matches){
        this.NBAMatches = matches?.nbaMatches
        this.UFCMatches = matches?.ufcMatches
        this.UEFAMatches = matches?.uefaMatches

        switch(this?.HeaderComponent?.activeSport){
          case "NBA":
            this.matches = matches?.nbaMatches;
            break;
          case "UFC":
            this.matches = matches?.ufcMatches;
            break;
          case "UEFA":
            this.matches = matches?.uefaMatches;
            break;
        }
        this.ChangeDetecotor.detectChanges();
      }    
    })
  }

  NBAMatches: Match[];
  UFCMatches: Match[];
  UEFAMatches: Match[];

  private subs = new SubSink();

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  getMatches(sport: string){

    switch(sport){
      case "NBA":
        this.matches = this.NBAMatches;
        break;
        case "UFC":
          this.matches = this.UFCMatches;
          break;
      case "UEFA":
        this.matches = this.UEFAMatches;
        break;
    }

  }

  matches = [];
  
}
