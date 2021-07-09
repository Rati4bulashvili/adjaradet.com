import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";

const routes: Routes = [
  { path: 'account-info', component: AccountComponent }
]//canactivate

@NgModule({
  imports: [RouterModule.forChild(routes),    
  ],
  exports: [RouterModule]
})

export class UserRouteModule {}