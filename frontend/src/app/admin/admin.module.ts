import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ADMIN_ROUTES } from './admin.routes';


@NgModule({
  imports: [
    RouterModule.forChild(ADMIN_ROUTES)
  ]
})
export class AdminModule {
}
