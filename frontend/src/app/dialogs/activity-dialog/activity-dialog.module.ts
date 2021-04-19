import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivityDialogFormComponent } from './activity-dialog-form/activity-dialog-form.component';
import { ActivityDialogViewComponent } from './activity-dialog-view/activity-dialog-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivityDialog } from './activity.dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  ConfirmDialogModule,
  ConfirmDialogService,
  ControlErrorModule,
  DefaultEqualModule,
  GetEntitiesModule,
  HighlightModule,
  SearchOptionModule,
  StopPropagationModule
} from 'ng-project-helper';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    ActivityDialog,
    ActivityDialogFormComponent,
    ActivityDialogViewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ControlErrorModule,
    MatSelectModule,
    SearchOptionModule,
    DefaultEqualModule,
    GetEntitiesModule,
    HighlightModule,
    StopPropagationModule,
    MatIconModule,
    MatCheckboxModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmDialogService]
})
export class ActivityDialogModule { }
