import { dateToPlain, dateToString, DefaultDictionary } from 'ng-project-helper';
import { classToPlain, Exclude, Transform } from 'class-transformer';
import { endOfMonth, startOfMonth } from 'date-fns';


export enum ReportType {
  Xls,
  Doc
}

export enum DiapasonType {
  Month,
  FirstHalfMonth,
  SecondHalfMonth,
  Custom
}

export const ReportTypes: DefaultDictionary<number>[] = [
  new DefaultDictionary(ReportType.Doc, 'Итоговый (DOC)'),
  new DefaultDictionary(ReportType.Xls, 'По дням (XLS)')
];

export const DiapasonTypes: DefaultDictionary<number>[] = [
  new DefaultDictionary(DiapasonType.Month, 'Полный месяц'),
  new DefaultDictionary(DiapasonType.FirstHalfMonth, '1-я половина месяца'),
  new DefaultDictionary(DiapasonType.SecondHalfMonth, '2-я половина месяца'),
  new DefaultDictionary(DiapasonType.Custom, 'Произвольный период')
];

export class ReportDialogFilter {
  type: ReportType = ReportType.Doc;
  label: string;

  @Transform(dateToPlain(), {toPlainOnly: true})
  start: Date = startOfMonth(new Date());

  @Transform(dateToPlain(), {toPlainOnly: true})
  end: Date = endOfMonth(new Date());

  @Exclude({toPlainOnly: true})
  get forGenerate(): Record<string, any> {
    this.label = this.getLabel();
    return classToPlain(this);
  }

  @Exclude({toPlainOnly: true})
  getLabel(): string {
    const reportTypeLabel = ReportTypes.find(item => item.value === this.type).label;
    const startLabel = dateToString(this.start, 'dd.MM.yyyy');
    const endLabel = dateToString(this.end, 'dd.MM.yyyy');
    return `${reportTypeLabel} с ${startLabel} по ${endLabel}`;
  }
}

export interface IReportResponse {
  ok: boolean;
  id: number;
}

