import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TweetsComponent } from './components/tweet/tweets.component';
import { AuthGuard } from './guards/auth.guard';
import { TweetsHomeComponent } from './components/tweets-home/tweets-home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyTweetsComponent } from './components/my-tweets/my-tweets.component';
import { AllTweetsComponent } from './components/all-tweets/all-tweets.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  { 'path': 'home', component: TweetsHomeComponent,
    children: [
      { 'path': '',  component: AllTweetsComponent },
      { 'path': 'my-tweets',  component: MyTweetsComponent, canActivate: [AuthGuard] },
    ]},
  { 'path': 'users/all', component: AllUsersComponent },
  { 'path': 'user/login', component: LoginComponent },
  { 'path': 'user/signup', component: SignupComponent },
  { 'path': 'user/forgot-password', component: ForgotPasswordComponent },
  { 'path': 'user/change-password', component: ChangePasswordComponent },
  { 'path': '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
