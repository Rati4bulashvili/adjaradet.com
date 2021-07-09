import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { FeatureStateNames } from "../shared/enums/feature-state-names";
import { AccountComponent } from "./account/account.component";
import { MessageComponent } from "./message/message.component";
import { LogInComponent } from "./modal/log-in/log-in.component";
import { ModalComponent } from "./modal/modal.component";
import { RegisterComponent } from "./modal/register/register.component";
import { NavbarComponent } from "./navbar.component";
import { AuthEffects } from "./store/auth/auth.effects";
import { reducer } from "./store/auth/auth.reducer";
import { UserRouteModule } from "./user-routing.module";
import { AccountHeaderComponent } from './account/account-header/account-header.component';
import { AccountInfoComponent } from './account/account-info/account-info.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, "assets/i18n/", ".json")
}

@NgModule({
  
  declarations: [
    MessageComponent,
    RegisterComponent,
    ModalComponent,
    AccountComponent,
    LogInComponent,
    NavbarComponent,
    AccountHeaderComponent,
    AccountInfoComponent
  ],
  imports: [

    StoreModule.forFeature(FeatureStateNames.auth, reducer),
    EffectsModule.forFeature([AuthEffects]),
    
    UserRouteModule,
    CommonModule, FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    NavbarComponent, RouterModule, TranslateModule
  ],
  providers: [
    HttpClientModule
  ]
})

export class UserModule {}