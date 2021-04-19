import { ControlsConfig } from 'ng-project-helper';
import { Validators } from '@angular/forms';


export const UserControlsConfig: ControlsConfig = {
  username: ['', [Validators.required]],
  password: ['', [Validators.minLength(6)]],
  firstName: ['', [Validators.required]],
  lastName: ['', [Validators.required]],
  email: ['', [Validators.required, Validators.email]],
  role: [null, [Validators.required]],
  id: [null],
};
