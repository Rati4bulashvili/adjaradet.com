import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountInfoComponent } from './navbar/account-info/account-info.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { SportsBookRouteModule } from './shared/sportsbook-router/sportsbook-route.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sportsbook', loadChildren: () => import('./sportsbook.module').then(m => m.SportsBookModule) },
  { path: 'account-info', canActivate: [AuthGuard], component: AccountInfoComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo:'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}), SportsBookRouteModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
