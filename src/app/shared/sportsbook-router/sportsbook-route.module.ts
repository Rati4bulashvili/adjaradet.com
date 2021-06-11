import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BetsHistoryItemComponent } from "src/app/bets-history/bets-history-list/bets-history-item/bets-history-item.component";
import { BetsHistoryComponent } from "src/app/bets-history/bets-history.component";
import { MatchesListComponent } from "../../sportsbook/matches-list/matches-list.component";
import { SportsbookComponent } from "../../sportsbook/sportsbook.component";
import { CanDeactivateGuard } from "../../sportsbook/ticket/bet-place/can-deactivate-guard.service";
import { AuthGuard } from "../guards/auth-guard.service";


const routes: Routes = [
    { path: 'sportsbook', component: SportsbookComponent, canDeactivate: [CanDeactivateGuard], children: [
        { path: ':sport', component: MatchesListComponent },
    ]},
    { path: 'betsHistory', canActivate: [AuthGuard], component: BetsHistoryComponent },
]

@NgModule({

    imports: [RouterModule.forChild(routes),    
    ],
    exports: [RouterModule]
})


export class SportsBookRouteModule {}