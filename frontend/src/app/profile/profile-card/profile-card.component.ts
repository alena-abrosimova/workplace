import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BaseForm, EntityService, validateFormGroup } from 'ng-project-helper';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { ChangePasswordDialogComponent } from './change-password-dialog';
import { SessionService } from '../../services/session.service';
import { ProfileControlsConfig } from './profile-card.data';
import { UserApi } from '../../server-api';
import { AppUrl } from '../../app.data';


@UntilDestroy()
@Component({
  selector: 'profile-card-page',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent extends BaseForm {
  cardForm: FormGroup = this.initForm(ProfileControlsConfig);
  user: UserApi = this.sessionService.user;
  userId: number = this.sessionService.userId;

  constructor(private toastrModule: ToastrService,
              private sessionService: SessionService,
              private entityService: EntityService,
              private dialog: MatDialog,
              formBuilder: FormBuilder) {
    super(formBuilder);
    this.cardForm.patchValue(this.user);
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent, {width: '300px'});
  }

  cancelEdit() {
    this.cardForm.patchValue(this.user);
  }

  completeActions(message: string, user: UserApi) {
    this.toastrModule.success(message);
    this.user = user;
    this.sessionService.setUser(user);
  }

  saveProfile() {
    if (this.cardForm.valid) {
      this.updateUser();
    } else {
      validateFormGroup(this.cardForm);
      this.toastrModule.warning('Обязательные поля не заполнены');
    }
  }

  updateUser() {
    this.entityService.updateEntity(this.cardForm.value, this.userId, AppUrl.User, UserApi)
      .pipe(untilDestroyed(this))
      .subscribe(user => this.completeActions('Изменения сохранены', user));
  }
}
