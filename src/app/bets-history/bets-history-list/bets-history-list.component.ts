import { Component, Input, OnInit } from '@angular/core';
import { FullBet } from 'src/app/shared/models/full-bet.model';

@Component({
  selector: 'app-bets-history-list',
  templateUrl: './bets-history-list.component.html',
  styleUrls: ['./bets-history-list.component.scss']
})
export class BetsHistoryListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() betsHistory: FullBet[];
}
