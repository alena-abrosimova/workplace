import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { objectArrayToFieldArray, objectToField } from 'ng-project-helper';


export class ProjectApi {
  constructor(public user: number) {
  }

  id: number;
  name: string;
}

export class DirectionApi {
  constructor(public user: number) {
  }

  id: number;
  name: string;
  @Type(() => ProjectApi)
  @Transform(objectToField<ProjectApi, 'id'>('id'), { toPlainOnly: true })
  project: ProjectApi;

  @Exclude({toPlainOnly: true})
  @Expose()
  get projectName(): string {
    return this.project ? this.project.name : 'Для всех проектов';
  }
}

export class ActivityTypeApi {
  constructor(public user: number) {
  }

  id: number;
  name: string;
  @Type(() => DirectionApi)
  @Transform(objectArrayToFieldArray<DirectionApi, 'id'>('id'), { toPlainOnly: true })
  direction: DirectionApi[];

  @Exclude({toPlainOnly: true})
  @Expose()
  get directionName(): string {
    return this.direction ? this._directionName : ' - ';
  }

  @Exclude({toPlainOnly: true})
  @Expose()
  private get _directionName(): string {
    return this.direction.map(dir => dir.name ? dir.name : ' - ').join(', ');
  }
}
