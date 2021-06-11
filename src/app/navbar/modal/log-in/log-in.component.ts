import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from 'src/app/shared/models/account.model';
import { Auth } from 'src/app/shared/models/auth.model';
import { AccountService } from 'src/app/shared/services/account.service';
import * as AuthActions from '../../../shared/store/auth/auth.actions'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private store: Store<{auth: Auth}>,
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

    this.store.dispatch(new AuthActions.LoginStart({email: form.value.email, password: form.value.password}))
    form.reset();
    this.accountService.toggleModal(false, '');
  }
  
  onCancelModal(){
    this.accountService.toggleModal(false, '')
    this.logInForm.reset();
  }
  
}


