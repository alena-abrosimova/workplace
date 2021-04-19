import { Type } from 'class-transformer';

import { WeekActivityApi } from './week-activity.api';


export class MonthActivityApi {
  week: number;

  @Type(() => WeekActivityApi)
  days: WeekActivityApi[];
}
