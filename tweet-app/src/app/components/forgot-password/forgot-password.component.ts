import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoadingOverlayService } from 'src/app/services/loading-overlay.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private userService: UserService, 
    private overlayService: LoadingOverlayService,
    private toastMessageService: ToastMessageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  forgotPassword(email: any) {
    this.overlayService.loadingOverlayShow();
    this.userService.sendRequestForForgotPassword(email)
      .pipe(finalize(() => this.overlayService.loadingOverlayHide()))
      .subscribe(
        (response) => {
          this.toastMessageService.createToastMessage("Password has been reset successfully. Your New password was sent to your email address.", "info")
        },
        (error) => {
          this.toastMessageService.createToastMessage("Some error occured. Please try again sometime.");
        }
      );
  }

}
