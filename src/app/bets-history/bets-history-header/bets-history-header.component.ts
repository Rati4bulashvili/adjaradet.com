import { Component, Input, OnInit } from '@angular/core';
import { FullBet } from 'src/app/shared/models/full-bet.model';

@Component({
  selector: 'app-bets-history-header',
  templateUrl: './bets-history-header.component.html',
  styleUrls: ['./bets-history-header.component.scss']
})
export class BetsHistoryHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() betsHistory: FullBet[]

}
