import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { AllSportsMatches } from 'src/app/shared/models/all-sports-matches.model';
import { AppState } from 'src/app/shared/store/app/app.reducer';
import { SubSink } from 'subsink';
import { DataService } from '../data-organise.service';

@Component({
  selector: 'app-matches-header',
  templateUrl: './matches-header.component.html',
  styleUrls: ['./matches-header.component.scss']
})
export class MatchesHeaderComponent implements OnInit, OnDestroy {

  constructor(
    public dataService: DataService,
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }
  
  ngOnInit(): void {
    this.subs.sink = this.activeRoute.params.subscribe(
      (params: Params) => {
        this.activeSport = params['sport'];
        this.ActiveSport.emit(this.activeSport)
      }
    )    

    this.subs.sink = this.store.select('matches').subscribe(matches =>{
      this.matches = matches;
    })
  }

  matches: AllSportsMatches;
  private subs = new SubSink;
    
  @Output() ActiveSport = new EventEmitter<string>(); 
  activeSport: string;

  ngOnDestroy(){
    this.subs.unsubscribe()
  }

}
