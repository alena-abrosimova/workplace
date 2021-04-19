import { Type } from 'class-transformer';

import { ActivityApi } from './activity.api';


export class WeekActivityApi {
  day: number;

  @Type(() => ActivityApi)
  activities: ActivityApi[];
}
