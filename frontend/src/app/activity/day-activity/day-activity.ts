import { classToPlain, Exclude, Transform } from 'class-transformer';
import { dateToPlain, EntitiesParams } from 'ng-project-helper';
import { ActivityApi } from '../../server-api';
import { AppUrl } from '../../app.data';


export class DayActivityFilter {
  constructor(public user: number) {
  }

  @Transform(dateToPlain(), {toPlainOnly: true})
  activityDate: Date = new Date();

  @Exclude({toPlainOnly: true})
  getEntitiesParams(): EntitiesParams<ActivityApi> {
    const params = classToPlain(this);
    return new EntitiesParams(AppUrl.Activity, ActivityApi, params);
  }
}
