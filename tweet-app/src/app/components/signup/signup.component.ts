import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { IUser } from 'src/app/models/iuser';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { UserService } from 'src/app/services/user.service';
import { createPasswordStrengthValidator, matchPassword } from 'src/app/shared/validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  imageUrl: any;
  constructor(private userService: UserService, 
    private toastMessageService: ToastMessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern(/[1-9]{1}[0-9]{9}/)]),
      image: new FormControl(null, [Validators.required])
    }, {
      validators: [matchPassword().bind(this)]
    }
    );
  }

  selectFile(eventTarget: any) {
    const file: File = eventTarget.files[0];
    const imageRegex = new RegExp(/^image\//)
    if(!imageRegex.test(file.type) || file.size > 10*1024) {
      this.signUpForm.controls['image'].setValue(null);
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(eventTarget.files[0]);

    reader.onload = () => {
      this.imageUrl = reader.result;
    }
  }

  signUpAction() {
    const signUpFormValue = this.signUpForm.value;
    const newUser = signUpFormValue as IUser;
    newUser.image = this.imageUrl;
    debugger
    this.userService.performSignUp(newUser)
      .pipe(tap(x => this.signUpForm.reset()))
      .subscribe(
      (data) => {
        this.router.navigate(['user/login']);
      },
      (error) => {
        this.toastMessageService.createToastMessage("Some error occured. Please try again sometime.")
      }
    );
  }
}
