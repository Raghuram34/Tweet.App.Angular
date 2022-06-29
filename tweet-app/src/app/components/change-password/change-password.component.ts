import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoadingOverlayService } from 'src/app/services/loading-overlay.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { UserService } from 'src/app/services/user.service';
import { createPasswordStrengthValidator, matchPassword } from 'src/app/shared/validation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(private router: Router,
     private userService: UserService,
     private overlayService: LoadingOverlayService,
     private toastMessageService: ToastMessageService) { }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, {
      validators: [matchPassword().bind(this)]
    });
  }

  changePassword() {
    this.overlayService.loadingOverlayShow();
    this.userService.sendRequestForChangePassword(this.changePasswordForm.controls['oldPassword'].value,
      this.changePasswordForm.controls['password'].value)
      .pipe(finalize(() => this.overlayService.loadingOverlayHide()))
      .subscribe(
        (response) => {
          this.router.navigate(['']);
        },
        (error) => {
          this.toastMessageService.createToastMessage("Invalid old Password!");
        }
      );
  }
}
