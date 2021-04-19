import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { RouterHelperService } from '../services/router-helper.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService,
              private routerHelper: RouterHelperService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError(error => this._showErrorMessage(error)),
      );
  }

  private _showErrorMessage(errorResponse: HttpErrorResponse): Observable<never> {
    switch (errorResponse.status) {
      case 401:
        if (this.routerHelper.modulePath !== 'login') {
          this.toastrService.error('Вы не авторизованы, войдите в систему заново');
        }
        break;
      case 403:
        this.toastrService.error('У вас недостаточно прав, чтобы выполнить данное действие');
        break;
      case 503:
        this.toastrService.info('На сервере ведутся технические работы. Попробуйте позднее.');
        break;
      default:
        const options = {enableHtml: true, timeOut: 10000, tapToDismiss: false};
        this.toastrService
          .error(this._prepareErrorMessage(errorResponse.error, errorResponse.status, errorResponse.statusText), '', options);
    }

    return throwError(errorResponse);
  }

  private _prepareErrorMessage(error: any, errorStatus: number, errorStatusText: string): string {
    const status = `<b>Статус:</b> <i>${errorStatus}</i><br>`;
    const statusText = `<b>Сообщение:</b> <i>${errorStatusText}</i><br>`;
    let body = '';

    if (typeof error === 'object') {
      Object.keys(error).forEach(key => {
        const message: string = Array.isArray(error[key]) ? error[key].join(', ') : error[key];
        body += `<b>${key}:</b> <i>${message}</i><br>`;
      });
    }

    return `${status}${statusText}${body}`;
  }
}
