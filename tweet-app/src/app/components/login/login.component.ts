import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IUserAccount } from 'src/app/models/iuseraccount';
import { LoadingOverlayService } from 'src/app/services/loading-overlay.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, 
    private router: Router,
    private toastMessageService: ToastMessageService,
    private loadingOverlayService: LoadingOverlayService) { }

  ngOnInit(): void {
  }

  loginAction(loginForm: any) {
    this.loadingOverlayService.loadingOverlayShow();
    this.userService.sendLoginRequest(loginForm.email, loginForm.password)
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        switchMap((token: string) => {
          this.userService.setLocalStorageItem(token);
          return this.userService.getUserByEmail(loginForm.email);
        })
      ).subscribe(
        (user) => {
          const expiryDate = new Date();
          const userAcccount: IUserAccount = user as IUserAccount;
          userAcccount.tokenExpiry = expiryDate.getTime();
          // Set Current user details
          this.userService.setCurrentUser(userAcccount);
          this.userService.setUserLoggedIn(true);
          this.router.navigate(['/']);
          this.loadingOverlayService.loadingOverlayHide();
        },
        (error) => {
          this.loadingOverlayService.loadingOverlayHide();
          this.toastMessageService.createToastMessage("Invalid Username or Password");
        }
      )
  }
}
