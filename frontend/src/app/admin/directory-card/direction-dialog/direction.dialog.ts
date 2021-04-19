import { Component, Inject } from '@angular/core';
import { BaseForm, EntitiesParams } from 'ng-project-helper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DirectionControlsConfig } from './direction-dialog.data';
import { DirectionApi, ProjectApi } from '../../../server-api';
import { AppUrl } from '../../../app.data';


@Component({
  selector: 'direction',
  templateUrl: './direction.dialog.html',
  styleUrls: ['./direction.dialog.scss']
})
export class DirectionDialog extends BaseForm {
  cardForm = this.initForm(DirectionControlsConfig);

  projectParams: EntitiesParams<ProjectApi> = new EntitiesParams(AppUrl.Project, ProjectApi, {ordering: 'name'}, 'search');
  projects$: Observable<ProjectApi[]> = of<ProjectApi[]>([]);

  constructor(@Inject(MAT_DIALOG_DATA) public item: DirectionApi,
              formBuilder: FormBuilder) {
    super(formBuilder);

    if (this.item) {
      this.patchForm(this.item);
    }
  }
}
