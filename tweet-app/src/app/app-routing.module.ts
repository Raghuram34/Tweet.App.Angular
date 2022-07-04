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
import { TweetsResolveGuard } from './guards/tweets-resolve.guard';

const routes: Routes = [
  { 'path': 'home', component: TweetsHomeComponent, canActivate: [AuthGuard],
    children: [
      { 'path': '',  component: AllTweetsComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard], resolve: { tweets: TweetsResolveGuard } },
      { 'path': 'my-tweets',  component: MyTweetsComponent, canActivate: [AuthGuard] },
    ]},
  { 'path': 'view-tweets/:id',  component: AllTweetsComponent, runGuardsAndResolvers: 'always', resolve: { tweets: TweetsResolveGuard } },
  { 'path': 'users/all', runGuardsAndResolvers: 'always', component: AllUsersComponent },
  { 'path': 'user/login', component: LoginComponent },
  { 'path': 'user/signup', component: SignupComponent },
  { 'path': 'user/forgot-password', component: ForgotPasswordComponent },
  { 'path': 'user/change-password', component: ChangePasswordComponent },
  { 'path': '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
