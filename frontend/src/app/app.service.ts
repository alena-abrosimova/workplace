import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { LoginService } from './login/login.service';
import { UserApi } from './server-api';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient,
              private loginService: LoginService,
              private router: Router) {
  }

  initializeApp(): Promise<UserApi | null> {
    return this.getCurrentUser()
      .toPromise()
      .catch(() => Promise.resolve(null));
  }

  private getCurrentUser(): Observable<UserApi> {
    return !!localStorage.getItem('authorization') ? this.getProfile() : this.rejectInitialize();
  }

  private getProfile(): Observable<UserApi> {
    return this.loginService.getProfile();
  }

  private rejectInitialize(): Observable<UserApi> {
    this.router.navigate(['login']).then();

    return of<UserApi>(null);
  }
}
