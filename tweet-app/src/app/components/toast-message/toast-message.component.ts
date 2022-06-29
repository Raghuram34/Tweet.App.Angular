import { Component, OnInit } from '@angular/core';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.less']
})
export class ToastMessageComponent implements OnInit {
  toastMessage: string = '';
  showToast: boolean = false;
  toastClass = ""

  constructor(private toastMessageServie: ToastMessageService) { 
    
    //Listen to toast messages
    toastMessageServie.getToastMessage()
      .subscribe(toast => {
        this.toastMessage = toast.message;
        this.toastClass = toast.type;
        this.showToast = true;
        setTimeout(() => this.showToast = false, 10000);
      });
  }

  ngOnInit(): void {
    
  }

  dismiss() {
    this.showToast = false;
  }

}
