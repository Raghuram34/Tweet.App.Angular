import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../models/iuser';
import { environment } from 'src/environments/environment';
import { IUserAccount } from '../models/iuseraccount';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserSessionTokenKey = "USER_SESSION_TOKEN";
  UserDataKey = "USER_DATA";
  controllerName = environment.UserAPIPath;

  private isUserLoggedIn$ = new BehaviorSubject(false);
  private currentUser$: BehaviorSubject<IUserAccount> = new BehaviorSubject<IUserAccount>({});

  constructor(private router: Router, private httpClient: HttpClient) { 
    if(this.getLocalStorageItem() != null) {
      this.setUserLoggedIn(true);
      try {
        const user = JSON.parse(this.getLocalStorageItem(this.UserDataKey) as any) as IUserAccount;
        this.setCurrentUser(user);
        const expireInSecs = (user?.tokenExpiry as number) - new Date().getTime() + 15*60000;
        if(expireInSecs > 0) {
          setTimeout(() => this.userLogOut(), expireInSecs);
        }
        else {
          this.userLogOut();
        }
      } 
      catch (error) {
        this.userLogOut();
      }
    }
    else {
      this.userLogOut();
    }
  }

  isUserLoggedIn() {
    return this.isUserLoggedIn$;
  }

  setUserLoggedIn(flag: boolean) {
    this.isUserLoggedIn$.next(flag);
  }

  setCurrentUser(user: any) {
    this.currentUser$.next(user as IUserAccount);
    const userAccount: IUserAccount = user as IUserAccount;
    this.setLocalStorageItem(JSON.stringify(userAccount), this.UserDataKey);
  }

  getCurrentUser(): BehaviorSubject<IUserAccount> {
    return this.currentUser$;
  }

  setLocalStorageItem(token: string, key = this.UserSessionTokenKey) {
    localStorage.setItem(key, token);
  }

  getLocalStorageItem(key = this.UserSessionTokenKey): string | IUser | null {
    return localStorage.getItem(key);
  }

  removeLocalStorageItem() {
    localStorage.clear();
  }

  userLogOut() {
    this.removeLocalStorageItem();
    this.setUserLoggedIn(false);
    this.setCurrentUser(null);
  }

  sendLoginRequest(email: string, password: string): Observable<string> {
    console.log(email, password);
    const url =  `${this.controllerName}/login?email=${email}&password=${password}`;
    return this.httpClient.get(url,{responseType:'text'});
  }

  performSignUp(user: IUser): Observable<any> {
    const url =  this.controllerName+"/signup";
    return this.httpClient.post(url, user);
  }

  getUserByEmail(email: string): Observable<IUser> {
    const url =  this.controllerName+"/"+email;
    return this.httpClient.get<IUser>(url);
  }

  sendRequestToGetAllUsers() {
    const url = `${this.controllerName}`;
    return this.httpClient.get(url)
  }

  sendRequestForForgotPassword(email: any): Observable<any> {
    const url = `${this.controllerName}/${email}/forgot-password`;
    return this.httpClient.patch(url, {});
  }

  sendRequestForChangePassword(oldPassword: any, newPassword: any): Observable<any> {
    const url = `${this.controllerName}/${this.currentUser$.value.id}/change-password/${oldPassword}`;
    return this.httpClient.patch(url, JSON.stringify(newPassword));
  }
}
