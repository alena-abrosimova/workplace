import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivateResult } from 'ng-project-helper';

import { SessionService } from './services/session.service';


@Injectable()
export class AppGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,
              private sessionService: SessionService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateResult {
    if (this.sessionService.user) {
      this.router.navigate(['/activity']).then();

      return true;
    }
    this.router.navigate(['/login']).then();

    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateResult {
    return this.canActivate(childRoute, state);
  }
}
