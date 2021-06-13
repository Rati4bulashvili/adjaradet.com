import { NgModule } from "@angular/core";
import { AuthGuard } from "./shared/guards/auth-guard.service";
import { BetDetailsService } from './shared/services/bet-details.service';

@NgModule({
    providers: [ BetDetailsService, AuthGuard ],
})

export class CoreModule {}