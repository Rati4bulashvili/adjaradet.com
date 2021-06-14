import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { SportsBookModule } from "../sportsbook/sportsbook.module";
import { AccountInfoComponent } from "./account-info/account-info.component";
import { MessageComponent } from "./message/message.component";
import { LogInComponent } from "./modal/log-in/log-in.component";
import { ModalComponent } from "./modal/modal.component";
import { RegisterComponent } from "./modal/register/register.component";
import { NavbarComponent } from "./navbar.component";
import { UserRouteModule } from "./user-routing.module";

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, "assets/i18n/", ".json")
}

@NgModule({
  declarations: [
    MessageComponent,
    RegisterComponent,
    ModalComponent,
    AccountInfoComponent,
    LogInComponent,
    NavbarComponent
  ],
  imports: [
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