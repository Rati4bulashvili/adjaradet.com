import { Component, Input, OnInit } from '@angular/core';
import { FullBet } from 'src/app/shared/models/full-bet.model';

@Component({
  selector: 'app-bets-history-item',
  templateUrl: './bets-history-item.component.html',
  styleUrls: ['./bets-history-item.component.scss']
})
export class BetsHistoryItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() bet: FullBet;

}
