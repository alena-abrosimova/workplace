import { Component, HostListener, Inject } from '@angular/core';
import { BaseForm, EntitiesParams } from 'ng-project-helper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserControlsConfig } from './user-dialog.data';
import { RoleApi, UserApi } from '../../server-api';
import { AppUrl } from '../../app.data';


@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent extends BaseForm {
  roles$: Observable<RoleApi[]>;
  roleParams = new EntitiesParams<RoleApi>(AppUrl.Role, RoleApi);

  cardForm: FormGroup = this.initForm(UserControlsConfig);
  passwordHide: boolean = true;

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  constructor(private dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: UserApi,
              formBuilder: FormBuilder) {
    super(formBuilder);
    if (user) {
      this.cardForm.patchValue(user);
    }
  }
}
