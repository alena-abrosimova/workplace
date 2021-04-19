import { Injectable } from '@angular/core';
import { add, endOfMonth, endOfWeek, getWeek, startOfMonth, startOfWeek } from 'date-fns';
import { classToPlain, plainToClass } from 'class-transformer';
import { generateQuery, IDefaultResponse } from 'ng-project-helper';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ru as locale } from 'date-fns/locale';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BackgroundColors, WeekArray, WeekLabelModel, WeekListModel } from './activity';
import { ActivityDialog, ActivityDialogData } from '../dialogs/activity-dialog';
import { MonthActivityFilter } from './month-activity/month-activity';
import { TimerApi, TimerParams } from '../server-api/timer.api';
import { dateInDiapason, getRandomElement } from '../app.utils';
import { ActivityApi, MonthActivityApi } from '../server-api';
import { SubjectService } from '../services/subject.service';
import { ReportDialog } from '../dialogs/report-dialog';
import { AppUrl } from '../app.data';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private reportRef: MatDialogRef<ReportDialog>;

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private subjectService: SubjectService) {
  }

  getMonthActivity(filters: MonthActivityFilter): Observable<MonthActivityApi[]> {
    return this.http.post<IDefaultResponse<MonthActivityApi>>(`${AppUrl.MonthActivity}/`, classToPlain(filters))
      .pipe(
        tap(response => response.results = plainToClass(MonthActivityApi, response.results)),
        map(response => response.results)
      );
  }

  getActiveTimer(params: TimerParams | HttpParams): Observable<TimerApi> {
    params = generateQuery(params);
    return this.http.get<IDefaultResponse<TimerApi>>(`${AppUrl.ActivityTimer}/`, {params})
      .pipe(
        tap(response => response.results = plainToClass(TimerApi, response.results)),
        map(response => response.results[0])
      );
  }

  prepareStyle(activities: ActivityApi[], item: ActivityApi, index: number): ActivityApi {
    item.backgroundColor = getRandomElement<string>(BackgroundColors);
    return this.calculateMargin(activities, item, index);
  }

  calculateMargin(activities: ActivityApi[], item: ActivityApi, index: number): ActivityApi {
    item.marginBottom = this.calculateMarginBottom(activities, item, index);

    if (index === 0) {
      item.marginTop = item.startHour * 60 + item.startMinute + 'px';
    }

    return item;
  }

  calculateMarginBottom(activities: ActivityApi[], item: ActivityApi, index: number): string {
    if (activities.length === 1 || (activities.length - 1) === index) {
      return '0';
    }

    const nextItem = activities[index + 1];
    const hours = nextItem.startHour - item.endHour;
    const minutes = nextItem.startMinute - item.endMinute;

    return hours * 60 + minutes + 'px';
  }

  reloadActivities(result: boolean): void {
    if (result) {
      this.subjectService.setActivityChange$();
    }
  }

  findExistActivity(activities: ActivityApi[], hour: string): ActivityApi[] {
    return activities.filter(item => item.endHour === parseInt(hour.split(':')[0], 10));
  }

  openActivityDialog(item: ActivityApi, view: boolean = false): Observable<boolean> {
    const data = new ActivityDialogData(item, view);
    this.checkReportDialogRef();

    return this.dialog.open(ActivityDialog, {disableClose: true, data, width: '700px'})
      .afterClosed();
  }

  private checkReportDialogRef(): void {
    if (this.reportRef && this.reportRef.componentInstance) {
      this.reportRef.componentInstance.minimize = true;
    }
  }

  openReportDialog(): void {
    if (this.reportRef && this.reportRef.componentInstance) {
      this.reportRef.componentInstance.minimize = false;
    } else {
      this.reportRef = this._openReportDialog();
    }
  }

  private _openReportDialog(): MatDialogRef<ReportDialog> {
    return this.dialog.open(ReportDialog, {disableClose: true, width: '700px', hasBackdrop: false});
  }

  closeReportDialog(): void {
    if (this.reportRef) {
      this.reportRef.close();
    }
  }

  getLastEndTime(activities: ActivityApi[]): string {
    return activities[activities.length - 1].end;
  }

  getWeekList(start: Date, end: Date): WeekListModel[] {
    const weekList = [];
    let date = start;
    while (dateInDiapason(date, start, end)) {
      const weekLabel = getWeek(date, {locale});
      const week = weekList.find(item => item.label === weekLabel);
      if (week) {
        weekList.find(item => item.label === weekLabel).days.push(date);
      } else {
        weekList.push({label: weekLabel, days: [date]});
      }
      date = add(date, {days: 1});
    }

    return weekList;
  }

  getStartAndEndDate(currentDate: Date): Date[] {
    const startMonth = startOfMonth(currentDate);
    const endMonth = endOfMonth(currentDate);

    return [startOfWeek(startMonth, {locale}), endOfWeek(endMonth, {locale})];
  }

  getMondaySunday(currentDate: Date): Date[] {
    const sunday = endOfWeek(currentDate, {locale});
    const monday = startOfWeek(currentDate, {locale});

    return [monday, sunday];
  }

  getWeekArray(monday: Date): WeekLabelModel[] {
    const weekArray = WeekArray;
    weekArray.map((item, index) => item.date = add(monday, {days: index}));

    return weekArray;
  }
}
