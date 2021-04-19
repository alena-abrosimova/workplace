import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PROFILE_ROUTES } from './profile.routes';


@NgModule({
  imports: [
    RouterModule.forChild(PROFILE_ROUTES),
  ]
})
export class ProfileModule {
}
