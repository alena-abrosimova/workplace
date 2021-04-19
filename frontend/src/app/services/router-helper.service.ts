import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';

import { ParamsUrlRegExp } from '../app.data';


@Injectable({
  providedIn: 'root'
})
export class RouterHelperService {
  get urlArray(): string[] {
    return this.clearUrl.split('/');
  }

  get modulePath(): string {
    return this.urlArray[1];
  }

  get clearUrl(): string {
    return this.router.url
      .replace(ParamsUrlRegExp, '');
  }

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  navigate(commands: any[], extras?: NavigationExtras): void {
    this.router.navigate(commands, extras).then();
  }

  navigateWithQuery(commands: any[], queryParams: Params, extras?: NavigationExtras): void {
    this.router.navigate(commands, Object.assign({queryParams}, extras)).then();
  }

  includes(name: string): boolean {
    return this.clearUrl.includes(name);
  }

  endWith(name: string): boolean {
    return this.clearUrl.endsWith(name);
  }

  getDateQueryParam(name: string): Date {
    return new Date(this.route.snapshot.queryParamMap.get(name));
  }

  getIntParam(name: string): number {
    const route: ActivatedRoute = this.getActiveRoute(name);

    return route && route.snapshot ? parseInt(route.snapshot.paramMap.get(name), 10) : null;
  }

  hasQueryParam(name: string): boolean {
    return this.route.snapshot.queryParamMap.has(name);
  }

  private getActiveRoute(name?: string): ActivatedRoute {
    let findRoute: ActivatedRoute = this.route;
    while (!!findRoute.firstChild && findRoute.snapshot && !findRoute.snapshot.paramMap.has(name)) {
      findRoute = findRoute.firstChild;
    }

    return findRoute;
  }
}
