import { ActivityApi } from '../../server-api';
import { ControlsConfig } from 'ng-project-helper';
import { Validators } from '@angular/forms';


export interface IActivityValidation {
  ok: boolean;
  start: string;
  end: string;
  timer: string;
}

export class ActivityDialogData {
  constructor(public item: ActivityApi,
              public view: boolean = false,
              public editable: boolean = true) {
  }
}

export const ActivityControlsConfig: ControlsConfig = {
  activityDate: [null, [Validators.required]],
  start: ['', [Validators.required]],
  end: ['', [Validators.required]],
  description: [''],
  project: [null, [Validators.required]],
  direction: [null, [Validators.required]],
  type: [null, [Validators.required]],
  task: [{value: '', disabled: true}],
  withoutTask: [true],
  id: [null]
};
