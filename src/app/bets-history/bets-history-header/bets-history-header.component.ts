import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bets-history-header',
  templateUrl: './bets-history-header.component.html',
  styleUrls: ['./bets-history-header.component.scss']
})
export class BetsHistoryHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() betsHistoryLength: number[]

}
