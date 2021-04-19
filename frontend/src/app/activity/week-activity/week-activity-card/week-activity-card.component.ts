import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isOnChanges } from 'ng-project-helper';

import { ActivityApi, WeekActivityApi } from '../../../server-api';
import { ActivityService } from '../../activity.service';
import { TimeModel, WeekLabelModel } from '../../activity';


@UntilDestroy()
@Component({
  selector: 'week-activity-card',
  templateUrl: './week-activity-card.component.html',
  styleUrls: ['./week-activity-card.component.scss']
})
export class WeekActivityCardComponent implements OnChanges {
  @Input() weekActivities: WeekActivityApi[];
  @Input() weekDayArray: WeekLabelModel[];
  @Input() timeArray: TimeModel[];

  weekFormat = 'dd.MM.yy';
  weekFormatMobile = 'dd';
  scrollTop: number = 0;

  constructor(public activityService: ActivityService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChanges(changes.weekActivities)) {
      this.weekActivities.forEach(item =>
        item.activities.forEach((activity, index) => this.activityService.prepareStyle(item.activities, activity, index)));
      this.scrollTop = this.calculateScrollTop();
    }
  }

  checkTime(day: Date, hour: string, idx: number) {
    const existActivities = this.activityService.findExistActivity(this.weekActivities[idx].activities, hour);
    if (existActivities.length > 0) {
      hour = this.activityService.getLastEndTime(existActivities);
    }
    this.addActivity(day, hour);
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

  calculateScrollTop(): number {
    const firstActivity = this.getFirstActivity();
    if (firstActivity) {
      return firstActivity.startHour * 60;
    }

    return 0;
  }

  getFirstActivity() {
    let firstActivity = null;
    this.weekActivities.forEach(item => {
      item.activities.forEach(activity => {
        if (!firstActivity || activity.start < firstActivity.start) {
          firstActivity = activity;
        }
      });
    });

    return firstActivity;
  }
}
