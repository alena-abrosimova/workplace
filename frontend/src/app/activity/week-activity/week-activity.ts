import { classToPlain, Exclude, Transform } from 'class-transformer';
import { dateToPlain, EntitiesParams } from 'ng-project-helper';
import { WeekActivityApi } from '../../server-api';
import { AppUrl } from '../../app.data';


export class WeekActivityFilter {
  constructor(public user: number) {
  }

  @Transform(dateToPlain(), {toPlainOnly: true})
  monday: Date;
  @Transform(dateToPlain(), {toPlainOnly: true})
  sunday: Date;

  @Exclude({toPlainOnly: true})
  getEntitiesParams(): EntitiesParams<WeekActivityApi> {
    const params = classToPlain(this);
    return new EntitiesParams(AppUrl.WeekActivity, WeekActivityApi, params);
  }
}
