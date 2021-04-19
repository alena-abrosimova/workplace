import { dateToPlain, dateToString } from 'ng-project-helper';
import { Exclude, Transform } from 'class-transformer';
import { WeekListModel } from '../activity';


export class MonthActivityFilter {
  constructor(public user: number) {
  }

  @Transform(dateToPlain(), {toPlainOnly: true})
  start: Date;
  @Transform(dateToPlain(), {toPlainOnly: true})
  end: Date;
  weekList: string[][] = [];

  @Exclude({toPlainOnly: true})
  setWeekList(weekList: WeekListModel[]): void {
    this.weekList = weekList.map(week => week.days.map(day => dateToString(day)));
  }
}
