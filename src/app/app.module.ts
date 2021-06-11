import { HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PicturesSliderComponent } from './home/pictures-slider/pictures-slider.component';
import { SportsPicturesComponent } from './home/sports-pictures/sports-pictures.component';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { LogInComponent } from './navbar/modal/log-in/log-in.component';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './navbar/message/message.component'

import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './shared/store/auth/auth.reducer';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AccountInfoComponent } from './navbar/account-info/account-info.component';
import { RegisterComponent } from './navbar/modal/register/register.component';
import { ModalComponent } from './navbar/modal/modal.component';
import { SportsBookModule } from './sportsbook.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './shared/store/auth/auth.effects';
import { AccountDataReducer } from './shared/store/account-data/account-data.reducer';
import { AccountDataEffects } from './shared/store/account-data/account-data.effects';
import { BetsHistoryListComponent } from './bets-history/bets-history-list/bets-history-list.component';
import { MatchesReducer } from './shared/store/matches/matches.reducer';
import { MatchesEffects } from './shared/store/matches/matches.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PicturesSliderComponent,
    SportsPicturesComponent,
    NotFoundComponent,
    LogInComponent,
    MessageComponent,
    AccountInfoComponent,
    RegisterComponent,
    ModalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SportsBookModule,
    StoreModule.forRoot({auth: AuthReducer, accountData: AccountDataReducer, matches: MatchesReducer}),
    EffectsModule.forRoot([AuthEffects, AccountDataEffects, MatchesEffects]),
    CommonModule,

    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }


