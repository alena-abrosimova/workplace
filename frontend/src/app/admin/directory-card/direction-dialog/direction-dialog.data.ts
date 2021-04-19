import { ControlsConfig } from 'ng-project-helper';
import { Validators } from '@angular/forms';


export const DirectionControlsConfig: ControlsConfig = {
  id: [null],
  name: ['', [Validators.required]],
  project: [null, [Validators.required]],
};
