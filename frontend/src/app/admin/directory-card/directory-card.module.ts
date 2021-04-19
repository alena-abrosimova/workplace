import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryCardComponent } from './directory-card.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DirectoryCardTableComponent } from './directory-card-table/directory-card-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectDialog } from './project-dialog/project.dialog';
import { DirectionDialog } from './direction-dialog/direction.dialog';
import { ActivityTypeDialog } from './activity-type-dialog/activity-type.dialog';
import {
  ConfirmDialogModule,
  ConfirmDialogService,
  ControlErrorModule,
  DefaultEqualModule,
  GetEntitiesModule,
  HighlightModule,
  MultiOptionModule,
  SearchOptionModule,
  StopPropagationModule
} from 'ng-project-helper';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DirectoryCardTableLabelPipe } from './directory-card-table/directory-card-table-label.pipe';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    DirectoryCardComponent,
    DirectoryCardTableComponent,
    ProjectDialog,
    DirectionDialog,
    ActivityTypeDialog,
    DirectoryCardTableLabelPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DirectoryCardComponent}]),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    GetEntitiesModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTooltipModule,
    StopPropagationModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ControlErrorModule,
    MatInputModule,
    ConfirmDialogModule,
    SearchOptionModule,
    MatSelectModule,
    HighlightModule,
    DefaultEqualModule,
    MultiOptionModule,
  ],
  providers: [ConfirmDialogService]
})
export class DirectoryCardModule {
}
