export const TimeArray: TimeModel[] = [
  {start: '00:00', height: 60, hour: 0, extra: 0},
  {start: '01:00', height: 60, hour: 1, extra: 0},
  {start: '02:00', height: 60, hour: 2, extra: 0},
  {start: '03:00', height: 60, hour: 3, extra: 0},
  {start: '04:00', height: 60, hour: 4, extra: 0},
  {start: '05:00', height: 60, hour: 5, extra: 0},
  {start: '06:00', height: 60, hour: 6, extra: 0},
  {start: '07:00', height: 60, hour: 7, extra: 0},
  {start: '08:00', height: 60, hour: 8, extra: 0},
  {start: '09:00', height: 60, hour: 9, extra: 0},
  {start: '10:00', height: 60, hour: 10, extra: 0},
  {start: '11:00', height: 60, hour: 11, extra: 0},
  {start: '12:00', height: 60, hour: 12, extra: 0},
  {start: '13:00', height: 60, hour: 13, extra: 0},
  {start: '14:00', height: 60, hour: 14, extra: 0},
  {start: '15:00', height: 60, hour: 15, extra: 0},
  {start: '16:00', height: 60, hour: 16, extra: 0},
  {start: '17:00', height: 60, hour: 17, extra: 0},
  {start: '18:00', height: 60, hour: 18, extra: 0},
  {start: '19:00', height: 60, hour: 19, extra: 0},
  {start: '20:00', height: 60, hour: 20, extra: 0},
  {start: '21:00', height: 60, hour: 21, extra: 0},
  {start: '22:00', height: 60, hour: 22, extra: 0},
  {start: '23:00', height: 60, hour: 23, extra: 0},
];

export class TimeModel {
  start: string;
  height: number;
  hour: number;
  extra?: number;
}

export const WeekArray: { label: string, date: Date }[] = [
  { label: 'ПН', date: null },
  { label: 'ВТ', date: null },
  { label: 'СР', date: null },
  { label: 'ЧТ', date: null },
  { label: 'ПТ', date: null },
  { label: 'СБ', date: null },
  { label: 'ВС', date: null }
];

export const BackgroundColors: string[] = [
  '#f9a98d',
  '#ffd8a1',
  '#faf5b3',
  '#d5e6af',
  '#c5e2b6',
  '#b8def5',
  '#abb7dd',
  '#c5acd3',
  '#e6b3d2',
  '#f7aec1'
];

export class DateValue {
  value: Date;
}

export class WeekLabelModel {
    label: string;
    date: Date;
}

export class WeekListModel {
    label: number;
    days: Date[];
}

