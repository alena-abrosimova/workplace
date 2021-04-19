import { Exclude, Transform } from 'class-transformer';
import { dateToClass, dateToPlain } from 'ng-project-helper';


export class TimerSettings {
  constructor(public ended: string) {
  }
  id: number;
}

export class TimerParams {
  constructor(public user: number) {
  }

  state: TimerState = TimerState.PROCESS;
}

export enum TimerState {
  PROCESS = 1,
  COMPLETE = 2,
  REJECT = 3
}

export class TimerApi {
  constructor(activityDate: Date) {
    if (activityDate) {
      this.activityDate = activityDate;
    }
  }

  id: number;
  description: string = 'Таймер';
  state: TimerState;
  user: number;
  @Transform(dateToPlain('yyyy-MM-dd\'T\'HH:mm:ss.SSS'), {toPlainOnly: true})
  @Transform(dateToClass(), {toClassOnly: true})
  activityDate: Date;
  @Exclude({toPlainOnly: true})
  @Transform(dateToClass(), {toClassOnly: true})
  completed: Date;
  @Exclude({toPlainOnly: true})
  @Transform(dateToClass(), {toClassOnly: true})
  created: Date;
}
