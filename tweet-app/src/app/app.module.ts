import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TweetsComponent } from './components/tweet/tweets.component';
import { TweetsHomeComponent } from './components/tweets-home/tweets-home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { MyTweetsComponent } from './components/my-tweets/my-tweets.component';
import { AllTweetsComponent } from './components/all-tweets/all-tweets.component';
import { InterceptorInterceptor } from './interceptors/interceptor.interceptor';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TweetsComponent,
    TweetsHomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileMenuComponent,
    MyTweetsComponent,
    AllTweetsComponent,
    AllUsersComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ToastMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
