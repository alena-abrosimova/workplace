import { ControlsConfig } from 'ng-project-helper';
import { Validators } from '@angular/forms';


export const ProfileControlsConfig: ControlsConfig = {
  username: ['', Validators.required],
  firstName: [''],
  middleName: [''],
  lastName: [''],
  birthday: [null],
  email: ['', [Validators.required, Validators.email]],
  mobile: [''],
  phone: ['']
};

export const ChangePasswordControlsConfig: ControlsConfig = {
  oldPassword: ['', [Validators.required, Validators.minLength(6)]],
  newPassword: ['', [Validators.required, Validators.minLength(6)]],
  repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
};
