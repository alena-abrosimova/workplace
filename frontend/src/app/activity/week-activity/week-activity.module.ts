import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekActivityComponent } from './week-activity.component';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormatDatePipeModule, GetEntitiesModule } from 'ng-project-helper';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivityMenuModule } from '../activity-menu';
import { RouterModule } from '@angular/router';
import { ActivityService } from '../activity.service';
import { WeekActivityCardComponent } from './week-activity-card/week-activity-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivityDialogModule } from '../../dialogs/activity-dialog';


@NgModule({
  declarations: [
    WeekActivityComponent,
    WeekActivityCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: WeekActivityComponent}]),
    FlexModule,
    MatButtonModule,
    FormatDatePipeModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    ActivityMenuModule,
    MatProgressSpinnerModule,
    GetEntitiesModule,
    ActivityDialogModule
  ],
  providers: [ActivityService]
})
export class WeekActivityModule {
}
