import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


function eventIsUnauthorizedResponse(httpEvent: HttpEvent<any> | HttpErrorResponse): boolean {
  return (httpEvent instanceof HttpResponse || httpEvent instanceof HttpErrorResponse) && httpEvent.status === 401;
}

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let response;

    return next.handle(request)
      .pipe(
        catchError(errorResponse => this.catchResponseError(errorResponse)),
        tap(_response => response = _response),
        finalize(() => this._redirectToLoginPage(response))
      );
  }

  private _redirectToLoginPage(httpEvent: HttpEvent<any> | HttpErrorResponse): void {
    if (eventIsUnauthorizedResponse(httpEvent)) {
      localStorage.clear();
      this.router.navigate(['login']).then();
    }
  }

  private catchResponseError(errorResponse: HttpErrorResponse): Observable<never> {
    this._redirectToLoginPage(errorResponse);

    return throwError(errorResponse);
  }
}
