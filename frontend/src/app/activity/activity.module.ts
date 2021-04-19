import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ACTIVITY_ROUTES } from './activity.routes';


@NgModule({
  imports: [
    RouterModule.forChild(ACTIVITY_ROUTES)
  ]
})
export class ActivityModule {
}
