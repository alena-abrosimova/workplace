import { Component, HostListener } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BaseForm, validateFormGroup } from 'ng-project-helper';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { ChangePasswordControlsConfig } from '../profile-card.data';
import { LoginService } from '../../../login/login.service';


@UntilDestroy()
@Component({
  selector: 'change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent extends BaseForm {
  cardForm: FormGroup = this.initForm(ChangePasswordControlsConfig);
  oldPasswordHide: boolean = true;
  newPasswordHide: boolean = true;
  repeatPasswordHide: boolean = true;

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  constructor(private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              private toastrService: ToastrService,
              private loginService: LoginService,
              formBuilder: FormBuilder) {
    super(formBuilder);
  }

  checkFormAndChangePassword() {
    if (this.cardForm.invalid) {
      validateFormGroup(this.cardForm);
    } else {
      this.changePassword();
    }
  }

  changePassword() {
    this.loginService.changePassword(this.cardForm.value)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.completeChanges());
  }

  completeChanges() {
    this.toastrService.success('Пароль изменён');
    this.dialogRef.close();
  }
}
