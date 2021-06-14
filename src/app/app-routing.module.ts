import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserRouteModule } from './navbar/user-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SportsBookRouteModule } from './shared/sportsbook-router/sportsbook-route.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sportsbook', loadChildren: () => import('./sportsbook/sportsbook.module').then(m => m.SportsBookModule) },
  { path: 'account-info', loadChildren: () => import('./navbar/user.module').then(m => m.UserModule)},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo:'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}), SportsBookRouteModule, UserRouteModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
