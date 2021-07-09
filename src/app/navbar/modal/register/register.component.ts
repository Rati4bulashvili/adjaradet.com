import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/shared/services/account.service';
import { AppState } from 'src/app/shared/store/app/app.reducer';
import * as AuthActions from '../../store/auth/auth.actions'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(
    private accountService: AccountService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  @ViewChild('registerForm') registerForm: NgForm; 

  showModal: boolean;
  showStatuses = false;

  onRegister(form: NgForm){
    if(!form.valid){
      this.showStatuses = true;
      return;
    }

    this.store.dispatch(AuthActions.Register({email: form.value.email, password: form.value.password1}))
  }

  onCancelModal(){
    this.accountService.toggleModal(false, '')
    this.registerForm.reset();
  }

  ngOnDestroy(){
    this.registerForm.reset();
  }
}
