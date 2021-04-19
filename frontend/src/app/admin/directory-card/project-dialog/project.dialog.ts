import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseForm } from 'ng-project-helper';
import { FormBuilder } from '@angular/forms';

import { ProjectControlsConfig } from './project-dialog.data';
import { ProjectApi } from '../../../server-api';


@Component({
  selector: 'project',
  templateUrl: './project.dialog.html',
  styleUrls: ['./project.dialog.scss']
})
export class ProjectDialog extends BaseForm {
  cardForm = this.initForm(ProjectControlsConfig);

  constructor(@Inject(MAT_DIALOG_DATA) public item: ProjectApi,
              formBuilder: FormBuilder) {
    super(formBuilder);

    if (this.item) {
      this.patchForm(this.item);
    }
  }
}
