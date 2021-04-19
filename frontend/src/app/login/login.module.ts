import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LOGIN_ROUTES } from './login.routes';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(LOGIN_ROUTES),
      FlexModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      CommonModule
  ]
})

export class LoginModule {

}
