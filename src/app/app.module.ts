import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PicturesSliderComponent } from './home/pictures-slider/pictures-slider.component';
import { SportsPicturesComponent } from './home/sports-pictures/sports-pictures.component';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule } from '@angular/forms';

import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SportsBookModule } from './sportsbook/sportsbook.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './navbar/store/auth/auth.effects';
import { AccountDataEffects } from './navbar/store/account-data/account-data.effects';
import { MatchesEffects } from './sportsbook/matches-list/store/matches/matches.effects';
import { appReducer } from './shared/store/app/app.reducer';
import { UserModule } from './navbar/user.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PicturesSliderComponent,
    SportsPicturesComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule,

    SportsBookModule,
    UserModule,

    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, AccountDataEffects, MatchesEffects]),
    CommonModule,

    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }


