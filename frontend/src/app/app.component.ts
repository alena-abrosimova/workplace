import { Component } from '@angular/core';
import { Event as NavigationEvent, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { RouterHelperService } from './services/router-helper.service';


const WITHOUT_SIDEBAR_HEADER_URL: string[] = [
  '/login'
];

const WITHOUT_SIDEBAR_URL: string[] = [
  '/login'
];


@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isWithHeader: boolean = false;
  isWithSidebar: boolean = false;

  constructor(private router: Router,
              private routerHelper: RouterHelperService) {
    this.router.events
      .pipe(untilDestroyed(this))
      .subscribe((routerEvent: NavigationEvent) => this.checkUrls(routerEvent));
  }

  checkUrls(routerEvent: NavigationEvent): void {
    if (routerEvent instanceof NavigationEnd) {
      const clearUrl: string = this.routerHelper.clearUrl;
      this.isWithHeader = !WITHOUT_SIDEBAR_HEADER_URL.includes(clearUrl);
      this.isWithSidebar = !WITHOUT_SIDEBAR_URL.includes(clearUrl);
    }
  }
}
