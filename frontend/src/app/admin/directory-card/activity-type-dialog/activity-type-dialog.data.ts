import { ControlsConfig } from 'ng-project-helper';
import { Validators } from '@angular/forms';


export const ActivityTypeControlsConfig: ControlsConfig = {
  id: [null],
  name: ['', [Validators.required]],
  direction: [[], [Validators.required]],
};
