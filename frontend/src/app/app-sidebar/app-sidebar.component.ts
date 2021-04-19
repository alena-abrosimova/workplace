import { Component } from '@angular/core';
import { RouterHelperService } from '../services/router-helper.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent {

  constructor(private routerHelper: RouterHelperService) { }

  isState(state: string): boolean {
    return this.routerHelper.includes(`/${state}/`);
  }

  isRole(state: string): boolean {
    return this.routerHelper.endWith(`/${state}`);
  }
}
