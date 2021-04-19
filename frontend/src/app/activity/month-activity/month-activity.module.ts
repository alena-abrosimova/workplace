import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthActivityComponent } from './month-activity.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormatDatePipeModule, GetEntitiesModule } from 'ng-project-helper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivityMenuModule } from '../activity-menu';
import { RouterModule } from '@angular/router';
import { ActivityDialogModule } from '../../dialogs/activity-dialog';
import { ActivityService } from '../activity.service';
import { MonthActivityCardComponent } from './month-activity-card/month-activity-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    MonthActivityComponent,
    MonthActivityCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: MonthActivityComponent}]),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormatDatePipeModule,
    MatDatepickerModule,
    ActivityMenuModule,
    ActivityDialogModule,
    GetEntitiesModule,
    MatProgressSpinnerModule
  ],
  providers: [ActivityService]
})
export class MonthActivityModule {
}
