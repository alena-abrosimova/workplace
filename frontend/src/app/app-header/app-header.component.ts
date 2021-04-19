import { Component } from '@angular/core';
import { getHours } from 'date-fns';

import { RouterHelperService } from '../services/router-helper.service';
import { SessionService } from '../services/session.service';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  userFirstName = this.sessionService.user.firstName;
  isAdmin = this.sessionService.isAdmin;

  get greetingWords(): string {
    const nowHour: number = getHours(new Date());
    if (nowHour >= 5 && nowHour < 10) {
      return 'Доброе утро, ';
    } else if (nowHour >= 10 && nowHour < 18) {
      return 'Добрый день, ';
    } else if (nowHour >= 18 && nowHour < 23) {
      return 'Добрый вечер, ';
    } else if (nowHour >= 23 && nowHour < 5) {
      return 'Доброй ночи, ';
    }
  }

  constructor(private loginService: LoginService,
              private routerHelper: RouterHelperService,
              private sessionService: SessionService) {
  }

  isState(state: string): boolean {
    return this.routerHelper.includes(`/${state}`);
  }

  logout() {
    this.loginService.logout();
  }
}
