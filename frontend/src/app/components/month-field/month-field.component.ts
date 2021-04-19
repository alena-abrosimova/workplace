import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/yyyy'
  },
  display: {
    dateInput: 'LLLL yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  }
};

@Component({
  selector: 'month-field',
  templateUrl: './month-field.component.html',
  styleUrls: ['./month-field.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class MonthFieldComponent {
  @Input() date: Date | string;
  @Input() label: string;
  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();

  selectMonth(selectedDate: Date, datepicker: MatDatepicker<any>) {
    this.date = selectedDate;
    this.dateChange.emit(selectedDate);
    datepicker.close();
  }
}
