import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      // ...request,
      headers: request.headers
        // note: it's wrong defining the content-type as "multipart/form-data" without
        // define the boundaries also no need to define the content-type cause the payload type is form-data
        // so the browser could figure out the content-type and it will auto determine the boundaries
        // (https://stackoverflow.com/questions/72715243/boundary-value-of-the-header-content-type-is-not-applied-to-request-payload-and
        // .append('Content-Type', 'multipart/form-data')
        .append('Accept', 'application/json')
        .append('Accept-Language', 'en-US,en;q=0.9')

        .append(
          'Authorization',
          `Bearer ${window.localStorage.getItem('TOKEN_KEY')}`
        ),
    });

    return next.handle(modifiedRequest);
  }
}
