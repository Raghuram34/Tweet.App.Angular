import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isUserLoggedIn = false;

  constructor(private userService: UserService, private router: Router) {
    userService.isUserLoggedIn().subscribe(flag => this.isUserLoggedIn = flag)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // If user not logged then redirect to login
      if(!this.isUserLoggedIn) {
        this.router.navigate(['/user/login']);
      }
    return this.isUserLoggedIn;
  }
  
}
