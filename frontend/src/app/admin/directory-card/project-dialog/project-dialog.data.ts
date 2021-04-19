import { ControlsConfig } from 'ng-project-helper';
import { Validators } from '@angular/forms';


export const ProjectControlsConfig: ControlsConfig = {
  id: [null],
  name: ['', Validators.required],
};
