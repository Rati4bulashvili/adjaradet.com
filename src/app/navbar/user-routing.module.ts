import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth-guard.service";
import { AccountInfoComponent } from "./account-info/account-info.component";

const routes: Routes = [
  { path: 'account-info', component: AccountInfoComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(routes),    
  ],
  exports: [RouterModule]
})

export class UserRouteModule {}