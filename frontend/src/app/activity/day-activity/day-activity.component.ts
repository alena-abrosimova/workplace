import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { cloneArray, cloneObject, EntitiesParams } from 'ng-project-helper';
import { addDays } from 'date-fns';
import { Observable } from 'rxjs';

import { RouterHelperService } from '../../services/router-helper.service';
import { SessionService } from '../../services/session.service';
import { SubjectService } from '../../services/subject.service';
import { DateValue, TimeArray, TimeModel } from '../activity';
import { DayActivityFilter } from './day-activity';
import { ActivityApi } from '../../server-api';


@UntilDestroy()
@Component({
  selector: 'day-activity',
  templateUrl: './day-activity.component.html',
  styleUrls: ['./day-activity.component.scss']
})
export class DayActivityComponent {
  dayFormat: string = 'dd MMMM yyyy, cccc';
  userId: number = this.sessionService.userId;

  timeArray = cloneArray(TimeArray);
  filter: DayActivityFilter = new DayActivityFilter(this.userId);
  params: EntitiesParams<ActivityApi>;
  activities$: Observable<ActivityApi[]>;

  get currentDate(): Date {
    return this.filter.activityDate;
  }

  set currentDate(value: Date) {
    this.filter.activityDate = value;
  }

  constructor(private sessionService: SessionService,
              private subjectService: SubjectService,
              private routerHelper: RouterHelperService) {
    this.getDataFromParams();
    this.resetActivityParams();
    this.subscribeToActivityChanges();
  }

  getDataFromParams(): void {
    if (this.routerHelper.hasQueryParam('date')) {
      this.currentDate = this.routerHelper.getDateQueryParam('date');
    }
  }

  subscribeToActivityChanges(): void {
    this.subjectService.activityChange$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.resetActivityParams());
  }

  resetActivityParams(): void {
    this.params = this.filter.getEntitiesParams();
  }

  changeDay(event: MatDatepickerInputEvent<any> | DateValue, days?: number) {
    this.currentDate = event ? event.value : addDays(this.currentDate, days);
    this.routerHelper.navigateWithQuery([this.routerHelper.clearUrl], {date: this.currentDate});
    this.resetActivityParams();
  }

  calculateTimeItem(item: TimeModel, results: ActivityApi[]): TimeModel {
    results.forEach(activity => item.height += item.hour === activity.startHour ? 20 - activity.duration : 0);

    return item;
  }

  calculateTimeArray(results: ActivityApi[]): void {
    const activities = results.filter(item => item.duration < 20);
    this.timeArray = TimeArray.map(item => this.calculateTimeItem(cloneObject(item, TimeModel), activities));
  }
}
