import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  bearerToken: string = "";
  constructor(private userService: UserService) {
    userService.isUserLoggedIn().subscribe(
      (flag) => {
        this.bearerToken = flag ? userService.getLocalStorageItem() as string : "";
      }
    );
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({ 
                                headers: request.headers
                                  .set('content-type','application/json')
                                  .set('Authorization', 'Bearer '+this.bearerToken)
                              });
    return next.handle(modifiedRequest)
            .pipe(catchError(error => {
              if(error.status == 401) {
                this.userService.userLogOut();
              }
              return throwError(error);
            }));
  }
}
