import { Component, HostListener, Inject, ViewChild } from '@angular/core';
import { ConfirmDialogService, EntityService, SimpleHttpService, toClassToPlain } from 'ng-project-helper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ActivityDialogFormComponent } from './activity-dialog-form/activity-dialog-form.component';
import { ActivityDialogData, IActivityValidation } from './activity-dialog.data';
import { ActivityApi } from '../../server-api';
import { AppUrl } from '../../app.data';


@UntilDestroy()
@Component({
  selector: 'activity-dialog',
  templateUrl: './activity.dialog.html',
  styleUrls: ['./activity.dialog.scss']
})
export class ActivityDialog {
  @ViewChild('editCard') editCard: ActivityDialogFormComponent;
  view = this.data.view;
  item = this.data.item;
  editable = this.data.editable;

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  constructor(private dialogRef: MatDialogRef<ActivityDialog>,
              @Inject(MAT_DIALOG_DATA) public data: ActivityDialogData,
              private simpleHttpService: SimpleHttpService,
              private confirmDialogService: ConfirmDialogService,
              private entityService: EntityService,
              private toastrService: ToastrService) {
  }

  saveItem(): void {
    this.checkFormAndValidity()
      .pipe(
        switchMap(result => this.checkValidationResult(result)),
        untilDestroyed(this)
      )
      .subscribe(() => this.completeAction('Сохранено'));
  }

  deleteItem(): void {
    this.openConfirmDialog()
      .pipe(
        switchMap(result => this.checkConfirmResult(result)),
        untilDestroyed(this)
      )
      .subscribe(() => this.completeAction('Удалено'));
  }

  private openConfirmDialog(): Observable<boolean> {
    return this.confirmDialogService.openConfirmDialogWithResult();
  }

  private checkFormAndValidity(): Observable<any> {
    return this.editCard.formValid ? this.validateForm() : this.rejectSaving('Форма заполнена некорректно');
  }

  private checkConfirmResult(result: boolean): Observable<boolean> {
    return result ? this._deleteItem() : of<boolean>();
  }

  private rejectSaving(message: string): Observable<IActivityValidation | ActivityApi> {
    this.toastrService.info(message);
    this.editCard.markFormAllAsTouched();
    return of<IActivityValidation>();
  }

  private checkValidationResult(validation: IActivityValidation): Observable<IActivityValidation | ActivityApi> {
    if (validation.ok) {
      return this.updateOrCreateItem();
    }

    return this.rejectSaving(this.getValidationMessage(validation));
  }

  private getValidationMessage(validation: IActivityValidation): string {
    const start = validation.start ? `Время начала должно быть не раньше ${validation.start}. ` : '';
    const end = validation.end ? `Время окончания должно быть не позже ${validation.end}. ` : '';
    const timer = validation.timer ? `Время совпадает с неостановленным таймером - запущен в ${validation.timer}.` : '';
    return `${start}${end}${timer}`;
  }

  private updateOrCreateItem(): Observable<ActivityApi> {
    return this.item.id ? this.updateItem() : this.createItem();
  }

  private updateItem(): Observable<ActivityApi> {
    return this.entityService.updateEntity(this.editCard.formValue, this.item.id, AppUrl.Activity, ActivityApi);
  }

  private createItem(): Observable<ActivityApi> {
    return this.entityService.createEntity(this.editCard.formValue, AppUrl.Activity, ActivityApi);
  }

  private _deleteItem(): Observable<boolean> {
    return this.entityService.deleteEntity(this.item.id, AppUrl.Activity);
  }

  private validateForm(): Observable<IActivityValidation> {
    return this.simpleHttpService.post<IActivityValidation>(AppUrl.ActivityValidate, toClassToPlain(this.editCard.formValue, ActivityApi));
  }

  private completeAction(message: string): void {
    this.toastrService.success(message);
    this.dialogRef.close(true);
  }
}
