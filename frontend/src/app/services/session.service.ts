import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subject } from 'rxjs';

import { UserApi } from '../server-api';



@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userSubject$: Subject<UserApi> = new Subject<UserApi>();
  private _user: UserApi;

  get userId(): number {
    return this._user ? this._user.id : null;
  }

  get userAvatar(): string {
    return this._user ? this._user.avatar : null;
  }

  get user(): UserApi {
    return this._user;
  }

  get isAdmin(): boolean {
    return this._user.role === 'admin';
  }

  get user$(): Observable<UserApi> {
    return this.userSubject$.asObservable();
  }

  constructor() {
    this.user$.pipe(untilDestroyed(this))
      .subscribe(user => this._user = user);
  }

  setUser(user: UserApi): void {
    this.userSubject$.next(user);
  }

  setAvatar(avatar: string): void {
    this._user.avatar = avatar;
    this.userSubject$.next(this._user);
  }
}
