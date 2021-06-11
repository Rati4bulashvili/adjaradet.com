import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalPurpose } from 'src/app/shared/enums/modal-purpose.enum';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  constructor(
    private accountService: AccountService,
  ) {}

  private activatedSub: Subscription;
  modalPurpose = ModalPurpose;
  ngOnInit(): void {
    this.activatedSub = this.accountService.displayModal.subscribe((modalInfo: {displayModal: boolean, purpose: string}) => {
      this.purpose = modalInfo.purpose;
      this.displayModal = modalInfo.displayModal;
    })
  }

  purpose: string;
  displayModal: boolean;

  closeModal(modal:HTMLDivElement){
    if(modal.classList.contains('modal')){
      this.displayModal=false;
    }
  }

  ngOnDestroy(){
    this.activatedSub.unsubscribe();
  }


  
}
