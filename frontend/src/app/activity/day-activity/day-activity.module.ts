import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayActivityComponent } from './day-activity.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormatDatePipeModule, GetEntitiesModule } from 'ng-project-helper';
import { DayActivityCardComponent } from './day-activity-card/day-activity-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivityDialogModule } from '../../dialogs/activity-dialog';
import { ActivityService } from '../activity.service';
import { ActivityMenuModule } from '../activity-menu';


@NgModule({
  declarations: [
    DayActivityComponent,
    DayActivityCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DayActivityComponent}]),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    FormatDatePipeModule,
    GetEntitiesModule,
    MatProgressSpinnerModule,
    ActivityDialogModule,
    ActivityMenuModule
  ],
  providers: [ActivityService]
})
export class DayActivityModule {
}
