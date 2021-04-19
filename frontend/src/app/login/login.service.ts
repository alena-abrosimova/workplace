import { switchMap, tap } from 'rxjs/operators';
import { OkTrue, toClassToPlain } from 'ng-project-helper';
import { HttpClient } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserApi, UserPasswordApi } from '../server-api';
import { SessionService } from '../services/session.service';


class LoginData {
  username: string;
  password: string;
}

const AUTH_API = '/workplace/api/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private session: SessionService,
              private router: Router) {
  }

  getProfile(): Observable<UserApi> {
    return this.http.get(`${AUTH_API}user/profile/`)
      .pipe(tap(response => this.prepareUser(response)));
  }

  private prepareUser(user: UserApi): void {
    this.session.setUser(plainToClass(UserApi, user));
  }

  login(loginData: LoginData) {
    return this.http.post(`${AUTH_API}login/`, loginData)
      .pipe(
        tap((res: { token: string }) => this.completeLogin(res.token)),
        switchMap(() => this.getProfile()),
      );
  }

  private completeLogin(token: string): void {
    localStorage.clear();
    localStorage.setItem('authorization', `Token ${token}`);
  }

  logout() {
    this.session.setUser(null);
    localStorage.clear();
    this.router.navigate(['/login']).then();
  }

  changePassword(changesPassword: UserPasswordApi): Observable<OkTrue> {
    return this.http
      .post<OkTrue>(`${AUTH_API}user/change-password/`, toClassToPlain(changesPassword, UserPasswordApi));
  }
}
