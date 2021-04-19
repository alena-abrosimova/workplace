import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDialog } from './report.dialog';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MonthFieldModule } from '../../components/month-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportDialogFormComponent } from './report-dialog-form/report-dialog-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { ReportDialogItemComponent } from './report-dialog-item/report-dialog-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormatDatePipeModule } from 'ng-project-helper';



@NgModule({
  declarations: [
    ReportDialog,
    ReportDialogFormComponent,
    ReportDialogItemComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatInputModule,
    MonthFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormatDatePipeModule
  ]
})
export class ReportDialogModule { }
