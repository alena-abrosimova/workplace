import { Component, Inject } from '@angular/core';
import { BaseForm, EntitiesParams } from 'ng-project-helper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ActivityTypeControlsConfig } from './activity-type-dialog.data';
import { DirectionApi } from '../../../server-api';
import { AppUrl } from '../../../app.data';


@Component({
  selector: 'activity-type',
  templateUrl: './activity-type.dialog.html',
  styleUrls: ['./activity-type.dialog.scss']
})
export class ActivityTypeDialog extends BaseForm {
  cardForm = this.initForm(ActivityTypeControlsConfig);

  directionParams: EntitiesParams<DirectionApi> = new EntitiesParams(AppUrl.Direction, DirectionApi, {ordering: 'name'}, 'search');
  directions$: Observable<DirectionApi[]> = of<DirectionApi[]>([]);

  constructor(@Inject(MAT_DIALOG_DATA) public item: DirectionApi,
              formBuilder: FormBuilder) {
    super(formBuilder);

    if (this.item) {
      this.patchForm(this.item);
    }
  }
}
