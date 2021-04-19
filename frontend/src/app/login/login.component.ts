import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { validateFormGroup } from 'ng-project-helper';
import { Observable, of } from 'rxjs';

import { RouterHelperService } from '../services/router-helper.service';
import { LoginService } from './login.service';
import { UserApi } from '../server-api';


@UntilDestroy()
@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = this.initForm();
  hide: boolean = true;

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
              private routerHelper: RouterHelperService) {
    localStorage.clear();
  }

  login() {
    this.checkFormAndLogin()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.routerHelper.navigate(['/']));
  }

  checkFormAndLogin(): Observable<UserApi> {
    if (this.loginForm.invalid) {
      validateFormGroup(this.loginForm);

      return of<UserApi>();
    }
    return this.loginService.login(this.loginForm.value);
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
