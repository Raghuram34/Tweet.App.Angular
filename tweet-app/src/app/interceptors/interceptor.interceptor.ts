import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { catchError, tap } from 'rxjs/operators';

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
            .pipe(
              catchError(error => {
                if(error.status == 401) {
                  this.userService.userLogOut();
                }

                if(error instanceof HttpErrorResponse && this.isSuccess(error.status)) {
                  return of(new HttpResponse({
                    status: error.status,
                    body: error.error.text
                  }))
                }

                return throwError(error);
            }));
  }

  isSuccess(code: number): boolean {
    return code >= 200 && code < 300;
  }
}
