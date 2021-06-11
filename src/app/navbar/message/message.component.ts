import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('messageState', [
      state('inactive', style({
        'left': '0px',
        'transform': 'translateX(-100%)'
      })),
      state('active', style({
        'left': '25px',
        'transform': 'translateX(0)'
      })),
      transition('inactive <=> active', animate(900)),
    ])
  ]
})

export class MessageComponent implements OnInit, AfterViewInit {

  constructor(private changeDetector: ChangeDetectorRef) { }

  @Input() messageData: {message: string, error: boolean, state: string};
  state = 'inactive'

  ngAfterViewInit(){
    this.state = this.messageData?.state;
 
    interval(4000).pipe(take(1))
    .subscribe(()=>{
      this.state = 'inactive'
    })
    this.changeDetector.detectChanges()
  }

  ngOnInit(): void {

  }
  

}