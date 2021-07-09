import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core'
import { Store } from "@ngrx/store";
import { AppState } from "../store/app/app.reducer";
import * as fromAuthStore from '../../navbar/store/auth/auth.selectors'

@Injectable()

export class AuthGuard implements CanActivate{
    canActivate(): Observable<boolean> | Promise<boolean> | boolean{
        return this.checkAccountActivity();
    }

    checkAccountActivity(){
        if(this.email){
            return true;
        }
        else{
            this.router.navigate(['/']);
            return false;
        }
    }

    email: string;
    constructor(
        private router: Router,
        private store: Store<AppState>
    )
    {
        this.store.select(fromAuthStore.getMailState).subscribe(email => {
            this.email = email;
        })
    }
    

}