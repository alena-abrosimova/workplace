import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isOnChanges } from 'ng-project-helper';

import { ActivityService } from '../../activity.service';
import { ActivityApi } from '../../../server-api';
import { TimeModel } from '../../activity';


@UntilDestroy()
@Component({
  selector: 'day-activity-card',
  templateUrl: './day-activity-card.component.html',
  styleUrls: ['./day-activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayActivityCardComponent implements OnChanges {
  @Input() activities: ActivityApi[];
  @Input() currentDate: Date;
  @Input() timeArray: TimeModel[];

  scrollTop: number = 0;

  constructor(private activityService: ActivityService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChanges(changes.activities)) {
      this.activities.forEach((item, index) => this.activityService.prepareStyle(this.activities, item, index));
      this.scrollTop = this.calculateScrollTop();
    }
  }

  checkTimeAndAdd(day: Date, hour: string): void {
    const existActivities = this.activityService.findExistActivity(this.activities, hour);
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
    if (!this.activities || this.activities.length === 0) {
      return 0;
    }

    return this.activities[0].startHour * 60;
  }
}
