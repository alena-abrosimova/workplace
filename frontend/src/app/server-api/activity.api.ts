import { Exclude, Expose, Transform } from 'class-transformer';
import { ActivityTypeApi, DirectionApi, ProjectApi } from './dictionary.api';
import { UserApi } from './user.api';
import { dateToClass, dateToPlain, objectToField } from 'ng-project-helper';


export class ActivityApi {
  constructor(private currentDate?: Date, private startTime?: string) {
    this.activityDate = currentDate;
    this.start = startTime;
  }

  id: number;
  start: string;
  end: string;
  description: string;
  task: string;
  marginBottom: string;
  marginTop: string;
  backgroundColor: string;
  height: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  duration: number;

  @Transform(dateToPlain(), { toPlainOnly: true })
  @Transform(dateToClass(), { toClassOnly: true })
  activityDate?: Date | string;

  @Transform(objectToField<ProjectApi, 'id'>('id'), { toPlainOnly: true })
  project: ProjectApi;

  @Transform(objectToField<DirectionApi, 'id'>('id'), { toPlainOnly: true })
  direction: DirectionApi;

  @Transform(objectToField<ActivityApi, 'id'>('id'), { toPlainOnly: true })
  type: ActivityTypeApi;

  user: UserApi;

  @Exclude({toPlainOnly: true})
  @Expose()
  get label(): string {
    const label = this.description ? this.description : 'Без описания';
    return this.direction ? this.direction.name : label;
  }
}
