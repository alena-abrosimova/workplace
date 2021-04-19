import { Transform } from 'class-transformer';
import { dateToClass } from 'ng-project-helper';


export enum ReportState {
  process = 0,
  success = 1,
  error = 2
}

export class ReportApi {
  state: ReportState = ReportState.process;
  id: number;
  label: string;
  link: string;

  @Transform(dateToClass(), {toClassOnly: true})
  created: Date;

  @Transform(dateToClass(), {toClassOnly: true})
  started: Date;

  @Transform(dateToClass(), {toClassOnly: true})
  ended: Date;
}
