import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { addMonths } from 'date-fns';
import { Observable } from 'rxjs';

import { RouterHelperService } from '../../services/router-helper.service';
import { SessionService } from '../../services/session.service';
import { SubjectService } from '../../services/subject.service';
import { MonthActivityFilter } from './month-activity';
import { DateValue, WeekListModel } from '../activity';
import { ActivityService } from '../activity.service';
import { MonthActivityApi } from '../../server-api';


@UntilDestroy()
@Component({
  selector: 'month-activity',
  templateUrl: './month-activity.component.html',
  styleUrls: ['./month-activity.component.scss']
})
export class MonthActivityComponent {
  monthFormat: string = 'LLLL yyyy';
  userId: number = this.sessionService.userId;
  currentDate: Date = this.getDataFromParams();
  weekList: WeekListModel[] = [];
  filter: MonthActivityFilter = new MonthActivityFilter(this.userId);
  monthActivities$: Observable<MonthActivityApi[]>;

  get start(): Date {
    return this.filter.start;
  }

  set start(value: Date) {
    this.filter.start = value;
  }

  get end(): Date {
    return this.filter.end;
  }

  set end(value: Date) {
    this.filter.end = value;
  }

  constructor(private sessionService: SessionService,
              private activityService: ActivityService,
              private subjectService: SubjectService,
              private routerHelper: RouterHelperService) {
    this.subscribeToActivityChanges();
    this.prepareMonthData(true);
  }


  changeMonth(event: MatDatepickerInputEvent<any> | DateValue, count?: number) {
    this.currentDate = event ? event.value : this.currentDate = addMonths(this.currentDate, count);
    this.routerHelper.navigateWithQuery([this.routerHelper.clearUrl], {date: this.currentDate});
    this.prepareMonthData(true);
  }

  private subscribeToActivityChanges(): void {
    this.subjectService.activityChange$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.resetActivityParams());
  }

  private getDataFromParams(): Date {
    return this.routerHelper.hasQueryParam('date') ? this.routerHelper.getDateQueryParam('date') : new Date();
  }

  private prepareMonthData(newDate: boolean = false) {
    [this.start, this.end] = this.activityService.getStartAndEndDate(this.currentDate);
    this.weekList = this.activityService.getWeekList(this.start, this.end);
    this.resetActivityParams(newDate);
  }

  private resetActivityParams(newDate: boolean = false): void {
    if (newDate) {
      this.filter.setWeekList(this.weekList);
    }
    this.monthActivities$ = this.getMonthActivities();
  }

  getMonthActivities(): Observable<MonthActivityApi[]> {
    return this.activityService.getMonthActivity(this.filter);
  }
}
