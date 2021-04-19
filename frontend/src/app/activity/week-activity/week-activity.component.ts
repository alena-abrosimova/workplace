import { Component } from '@angular/core';
import { cloneArray, cloneObject, EntitiesParams } from 'ng-project-helper';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { addWeeks } from 'date-fns';
import { Observable } from 'rxjs';

import { DateValue, TimeArray, TimeModel, WeekLabelModel } from '../activity';
import { RouterHelperService } from '../../services/router-helper.service';
import { ActivityApi, WeekActivityApi } from '../../server-api';
import { SessionService } from '../../services/session.service';
import { SubjectService } from '../../services/subject.service';
import { ActivityService } from '../activity.service';
import { WeekActivityFilter } from './week-activity';


@UntilDestroy()
@Component({
  selector: 'week-activity',
  templateUrl: './week-activity.component.html',
  styleUrls: ['./week-activity.component.scss']
})
export class WeekActivityComponent {
  weekFormat: string = 'dd MMMM yyyy';
  userId: number = this.sessionService.userId;
  currentDate: Date = this.getDataFromParams();
  weekArray: WeekLabelModel[];

  timeArray = cloneArray(TimeArray);
  filter: WeekActivityFilter = new WeekActivityFilter(this.userId);
  params: EntitiesParams<WeekActivityApi>;
  weekActivities$: Observable<WeekActivityApi[]>;

  get monday(): Date {
    return this.filter.monday;
  }

  set monday(value: Date) {
    this.filter.monday = value;
  }

  get sunday(): Date {
    return this.filter.sunday;
  }

  set sunday(value: Date) {
    this.filter.sunday = value;
  }

  constructor(private sessionService: SessionService,
              private activityService: ActivityService,
              private subjectService: SubjectService,
              private routerHelper: RouterHelperService) {
    this.subscribeToActivityChanges();
    this.prepareWeekData();
  }

  calculateTimeArray(results: WeekActivityApi[]): void {
    this.timeArray = cloneArray(TimeArray);
    results.forEach(item => {
      const activities = item.activities.filter(activity => activity.duration < 20);
      this.timeArray = this.timeArray.map(timeItem => this.calculateTimeItem(cloneObject(timeItem, TimeModel), activities));
    });
  }

  private calculateTimeItem(item: TimeModel, activities: ActivityApi[]): TimeModel {
    let duration = 0;
    activities.forEach(activity => {
      if (item.hour === activity.startHour) {
        duration += 20 - activity.duration;
      }
    });
    if (duration > item.extra || !item.extra) {
      item.extra = duration;
      item.height = 59 + duration;
    }

    return item;
  }

  changeWeek(event: MatDatepickerInputEvent<any> | DateValue, week?: number) {
    this.currentDate = event ? event.value : this.currentDate = addWeeks(this.currentDate, week);
    this.routerHelper.navigateWithQuery([this.routerHelper.clearUrl], {date: this.currentDate});
    this.prepareWeekData();
  }

  private subscribeToActivityChanges(): void {
    this.subjectService.activityChange$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.resetActivityParams());
  }

  private resetActivityParams(): void {
    this.params = this.filter.getEntitiesParams();
  }

  private prepareWeekData() {
    [this.monday, this.sunday] = this.activityService.getMondaySunday(this.currentDate);
    this.weekArray = this.activityService.getWeekArray(this.monday);
    this.resetActivityParams();
  }

  private getDataFromParams(): Date {
    return this.routerHelper.hasQueryParam('date') ? this.routerHelper.getDateQueryParam('date') : new Date();
  }
}
