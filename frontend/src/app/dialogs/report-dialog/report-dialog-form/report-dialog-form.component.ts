import { Component, EventEmitter, Output } from '@angular/core';
import { endOfMonth, getMonth, getYear, startOfMonth } from 'date-fns';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { DiapasonType, DiapasonTypes, ReportDialogFilter, ReportTypes } from '../report-dialog.data';


@Component({
  selector: 'report-dialog-form',
  templateUrl: './report-dialog-form.component.html',
  styleUrls: ['./report-dialog-form.component.scss']
})
export class ReportDialogFormComponent {
  @Output() generate: EventEmitter<ReportDialogFilter> = new EventEmitter<ReportDialogFilter>();

  reportTypes = ReportTypes;
  diapasonTypes = DiapasonTypes;
  diapasonType = DiapasonType;
  diapasonCtrl = new FormControl(DiapasonType.FirstHalfMonth);
  filter = new ReportDialogFilter();

  constructor(private toastrService: ToastrService) {
  }

  setEndDate(value: Date): void {
    this.filter.end = endOfMonth(value);
  }

  checkFilterAndGenerateReport(): void {
    if (this.filter.start && this.filter.end) {
      this.generateReport();
    } else {
      this.toastrService.info('Не заполнены даты для отчёта');
    }
  }

  private generateReport(): void {
    if (this.diapasonCtrl.value === DiapasonType.FirstHalfMonth) {
      this.filter.start = startOfMonth(this.filter.start);
      this.filter.end = new Date(getYear(this.filter.start), getMonth(this.filter.start), 15);
    }
    if (this.diapasonCtrl.value === DiapasonType.SecondHalfMonth) {
      this.filter.start = new Date(getYear(this.filter.start), getMonth(this.filter.start), 16);
      this.filter.end = endOfMonth(this.filter.start);
    }
    this.generate.emit(this.filter);
  }
}
