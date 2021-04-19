import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modified = this.setTokenHeader(request);

    return next.handle(modified);
  }

  protected setTokenHeader(request: HttpRequest<any>): HttpRequest<any> {
    const authorizationToken: string = localStorage.getItem('authorization');

    if (authorizationToken) {
      return request.clone({
        setHeaders: {
          Authorization: localStorage.getItem('authorization')
        }
      });
    }

    return request;
  }
}
