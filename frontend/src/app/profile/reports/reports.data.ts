import { dateToPlain, EntitiesParams, genEntitiesParams, PaginationOption } from 'ng-project-helper';
import { Exclude, Transform } from 'class-transformer';

import { ReportApi, ReportState } from '../../server-api/report.api';
import { AppUrl } from '../../app.data';


export type ClearedReportsFilter = 'created_from' | 'created_to' | 'started_from' | 'started_to' | 'ended_from' | 'ended_to';
const filterList: ClearedReportsFilter[] = ['created_from', 'created_to', 'started_from', 'started_to', 'ended_from', 'ended_to'];

export class ReportsFilters {
  ordering: string = '-created';

  @Transform(dateToPlain(), {toPlainOnly: true})
  created_from: Date;
  @Transform(dateToPlain(), {toPlainOnly: true})
  created_to: Date;
  @Transform(dateToPlain(), {toPlainOnly: true})
  started_from: Date;
  @Transform(dateToPlain(), {toPlainOnly: true})
  started_to: Date;
  @Transform(dateToPlain(), {toPlainOnly: true})
  ended_from: Date;
  @Transform(dateToPlain(), {toPlainOnly: true})
  ended_to: Date;

  state: ReportState = ReportState.success;

  paginationOption: PaginationOption = new PaginationOption();

  @Exclude({toPlainOnly: true})
  filtersCount: number = 0;
  constructor(public user: number) {
  }

  @Exclude({toPlainOnly: true})
  get hasFilters(): boolean {
    return !!filterList.find(item => !!this[item]);
  }

  @Exclude({toPlainOnly: true})
  setFiltersCount(): void {
    this.filtersCount = filterList.filter(item => !!this[item]).length;
  }

  getEntitiesParams(search?: boolean): EntitiesParams<ReportApi> {
    this.paginationOption.offset = search ? 0 : this.paginationOption.offset;

    return genEntitiesParams(AppUrl.Report, this, ReportApi);
  }

  setLength(count: number): void {
    this.paginationOption.length = count;
  }
}
