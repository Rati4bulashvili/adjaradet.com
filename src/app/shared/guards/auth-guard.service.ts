import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core'
import { Store } from "@ngrx/store";
import { Auth } from "../models/auth.model";
import { AppState } from "../store/app/app.reducer";

@Injectable()

export class AuthGuard implements CanActivate{
    canActivate(): Observable<boolean> | Promise<boolean> | boolean{
        return this.checkAccountActivity();
    }

    checkAccountActivity(){
        if(this.authData?.email){
            return true;
        }
        else{
            this.router.navigate(['/']);
            return false;
        }
    }

    authData: Auth;

    constructor(
        private router: Router,
        private store: Store<AppState>
    )
    {
        this.store.select('auth').subscribe((authData)=>{
            this.authData = authData;
            this.canActivate();
        })

    }
    

}