import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/shared/services/account.service';
import { AppState } from 'src/app/shared/store/app/app.reducer';
import * as AuthActions from '../../store/auth/auth.actions'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private store: Store<AppState>,
  ) {}

  @ViewChild('logInForm') logInForm: NgForm; 
  inputMessage: string;

  ngOnInit(): void {
  }

  showStatuses = false;
  
  onLogin(form: NgForm){

    if(!form.valid){
      this.showStatuses = true;
      return;
    }

    this.store.dispatch(AuthActions.LoginStart({email: form.value.email, password: form.value.password}))
    form.reset();
    this.accountService.toggleModal(false, '');
  }
  
  onCancelModal(){
    this.accountService.toggleModal(false, '')
    this.logInForm.reset();
  }
  
}


