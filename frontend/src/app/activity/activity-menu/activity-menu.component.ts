import { Component, Input, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { dateToString, EntityService } from 'ng-project-helper';

import { TimerApi, TimerParams, TimerState } from '../../server-api/timer.api';
import { ActivityService } from '../activity.service';
import { SessionService } from '../../services/session.service';
import { ActivityApi } from '../../server-api';
import { intervalToDuration } from 'date-fns';
import { AppUrl } from '../../app.data';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@UntilDestroy()
@Component({
  selector: 'activity-menu',
  templateUrl: './activity-menu.component.html',
  styleUrls: ['./activity-menu.component.scss']
})
export class ActivityMenuComponent implements OnDestroy {
  @Input() currentDate: Date;

  timerDuration: Duration;
  intervalId: number;

  timerId: number;

  constructor(private activityService: ActivityService,
              private sessionService: SessionService,
              private entityService: EntityService,
              private toastrService: ToastrService) {
    this.getActiveTimer();
  }

  openActivityDialog(): void {
    this.activityService.openActivityDialog(new ActivityApi(this.currentDate, dateToString(new Date(), 'HH:mm')))
      .pipe(untilDestroyed(this))
      .subscribe((result) => this.activityService.reloadActivities(result));
  }

  openReportDialog(): void {
    this.activityService.openReportDialog();
  }

  startTimerAndCreate(): void {
    this.createTimer()
      .pipe(untilDestroyed(this))
      .subscribe(result => this.completeTimerData(result));
  }

  stopTimer(): void {
    window.clearInterval(this.intervalId);
    this.checkDurationAndStopTimer()
      .pipe(untilDestroyed(this))
      .subscribe(timer => this.clearTimerData(timer.state === TimerState.COMPLETE));
  }

  private getActiveTimer(): void {
    this.activityService.getActiveTimer(new TimerParams(this.sessionService.userId))
      .pipe(untilDestroyed(this))
      .subscribe(result => this.completeTimerData(result));
  }

  private completeTimerData(timer: TimerApi): void {
    if (timer && !timer.completed) {
      this.timerId = timer.id;
      this.startTimer(timer.activityDate);
    }
  }

  private clearTimerData(reload: boolean): void {
    this.timerDuration = undefined;
    this.timerId = null;
    this.activityService.reloadActivities(reload);
  }

  private startTimer(start: Date): void {
    this.timerDuration = intervalToDuration({start, end: new Date()});
    this.intervalId = window.setInterval(() => {
      this.timerDuration = intervalToDuration({start, end: new Date()});
    }, 1000);
  }

  private checkDurationAndStopTimer(): Observable<TimerApi> {
    if (this.timerDuration.minutes === 0 && this.timerDuration.hours === 0 && this.timerDuration.days === 0) {
      return this.rejectUpdateTimer();
    }

    return this.updateTimer(TimerState.COMPLETE);
  }

  private rejectUpdateTimer(): Observable<TimerApi> {
    this.toastrService.info('Время активности не может быть меньше 1 минуты');

    return this.updateTimer(TimerState.REJECT);
  }

  private createTimer(): Observable<TimerApi> {
    return this.entityService.createEntity(new TimerApi(new Date()), AppUrl.ActivityTimer, TimerApi);
  }

  private updateTimer(state: TimerState): Observable<TimerApi> {
    return this.entityService.updateEntity({state}, this.timerId, AppUrl.ActivityTimer, TimerApi);
  }

  ngOnDestroy(): void {
    this.activityService.closeReportDialog();
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}
