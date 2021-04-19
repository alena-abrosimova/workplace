import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReportsTableComponent } from './reports-table/reports-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  BaseTableModule,
  ConfirmDialogModule,
  ConfirmDialogService,
  FormatDatePipeModule,
  GetEntitiesModule,
  StopPropagationModule
} from 'ng-project-helper';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReportsTableDataDirective } from './reports-table/reports-table-data.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { ReportsFiltersComponent } from './reports-filters/reports-filters.component';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [
    ReportsComponent,
    ReportsTableComponent,
    ReportsTableDataDirective,
    ReportsFiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ReportsComponent}]),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    BaseTableModule,
    GetEntitiesModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormatDatePipeModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    StopPropagationModule,
    MatBadgeModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmDialogService]
})
export class ReportsModule {
}
