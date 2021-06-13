import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BetsHistoryComponent } from "src/app/bets-history/bets-history.component";
import { MatchesListComponent } from "../../sportsbook/matches-list/matches-list.component";
import { SportsbookComponent } from "../../sportsbook/sportsbook.component";
import { CanDeactivateGuard } from "../guards/can-deactivate-guard.service";
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