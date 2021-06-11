import { Directive, HostBinding, Input, OnChanges, OnInit} from '@angular/core';
import { Match } from 'src/app/shared/models/match-details.model';
import { ButtonHighlightService } from '../../../button-highlight.service';

@Directive({
    selector: '[oddsHighlight]'
})

export class OddsHighlightDirective implements OnChanges, OnInit{

    @Input('match') match: Match;
    @Input('highlightsArr') highlightsArr: Match[];
    @Input('bettingOn') bettingOn: string;
    @HostBinding('style.backgroundColor') backgroundColor: string;

    constructor(private buttonHighlightService: ButtonHighlightService){}

    ngOnInit(){
        this.applyHighlights();
    }
    
    ngOnChanges(){
        this.applyHighlights();
    }

    applyHighlights(){
        this.backgroundColor = 'rgba(42,50,55,255)';
        if(this.buttonHighlightService.matches.length > 0){
            this.buttonHighlightService.matches.forEach(highlightData => {
                if(this.match.home === highlightData.home && this.match.away===highlightData.away && highlightData.bettingOn === this.bettingOn){
                    this.backgroundColor = 'green';
                }
            });
        }
    }
}
