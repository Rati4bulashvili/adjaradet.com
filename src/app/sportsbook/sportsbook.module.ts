import { NgModule } from '@angular/core'
import { SportsbookComponent } from './sportsbook.component';
import { MatchesListComponent } from './matches-list/matches-list.component';
import { TicketComponent } from './ticket/ticket.component';
import { BetsHistoryComponent } from '../bets-history/bets-history.component';
import { MatchesHeaderComponent } from './matches-list/matches-header/matches-header.component';
import { MatchesItemComponent } from './matches-list/matches-item/matches-item.component';
import { MatchOddsComponent } from './matches-list/matches-item/match-odds/match-odds.component';
import { BetPlaceComponent } from './ticket/bet-place/bet-place.component';
import { MatchComponent } from './ticket/match/match.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './matches-list/matches-item/shorten.pipe';
import { SportsBookRouteModule } from '../shared/sportsbook-router/sportsbook-route.module';
import { OddsHighlightDirective } from './matches-list/matches-item/match-odds/odds-highlight.directive';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate-guard.service';
import { BetsHistoryHeaderComponent } from '../bets-history/bets-history-header/bets-history-header.component';
import { BetsHistoryItemComponent } from '../bets-history/bets-history-list/bets-history-item/bets-history-item.component';
import { BetsHistoryListComponent } from '../bets-history/bets-history-list/bets-history-list.component';

import { TranslateLoader, TranslateModule,  } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient){
    return new TranslateHttpLoader(http, "assets/i18n/", ".json")
}

@NgModule({
    declarations: [
        SportsbookComponent,
        MatchesListComponent,
        TicketComponent,
        BetsHistoryComponent,
        MatchesHeaderComponent,
        MatchesItemComponent,
        MatchOddsComponent,
        BetPlaceComponent,
        MatchComponent,
        ShortenPipe,
        OddsHighlightDirective,
        BetsHistoryHeaderComponent,
        BetsHistoryItemComponent,
        BetsHistoryListComponent
    ],
    imports: [
        SportsBookRouteModule,
        CommonModule,
        
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
        }),
    ],
    exports: [
        RouterModule, TranslateModule
    ],
    providers: [
        CanDeactivateGuard, HttpClientModule
    ]
})

export class SportsBookModule {}