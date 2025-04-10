import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            this.router.navigate(['authentication/login']);
          }
          if (error.status === 401) {
            this.router.navigate(['authentication/login']);
          }
          if (error.status === 405) {
            this.router.navigate(['']);
          } else if (error.status === 500) {
            // this.errorDialog.openErrorDialog(error.message);
          }
        }
        return throwError(() => error);
      })
    );
  }
}
