import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isOnChanges } from 'ng-project-helper';

import { WeekArray, WeekLabelModel, WeekListModel } from '../../activity';
import { ActivityService } from '../../activity.service';
import { ActivityApi, MonthActivityApi } from '../../../server-api';


@UntilDestroy()
@Component({
  selector: 'month-activity-card',
  templateUrl: './month-activity-card.component.html',
  styleUrls: ['./month-activity-card.component.scss']
})
export class MonthActivityCardComponent implements OnChanges {
  @Input() monthActivities: MonthActivityApi[];
  @Input() weekList: WeekListModel[];

  weekLabels: WeekLabelModel[] = WeekArray;
  weekRowLength: string = '0';
  dayFormat = 'dd';

  constructor(public activityService: ActivityService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChanges(changes.weekList)) {
      this.weekRowLength = (100 / this.weekList.length) + '%';
    }
  }

  addActivity(day: Date, hour?: string): void {
    const newActivity = new ActivityApi(day, hour);
    this.activityService.openActivityDialog(newActivity)
      .pipe(untilDestroyed(this))
      .subscribe(result => this.activityService.reloadActivities(result));
  }

  openViewDialog(activity: ActivityApi): void {
    this.activityService.openActivityDialog(activity, true)
      .pipe(untilDestroyed(this))
      .subscribe(result => this.activityService.reloadActivities(result));
  }
}
