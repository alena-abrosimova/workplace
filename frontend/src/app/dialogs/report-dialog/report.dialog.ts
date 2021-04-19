import { Component, HostListener } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialogRef } from '@angular/material/dialog';
import { SimpleHttpService } from 'ng-project-helper';
import { switchMap } from 'rxjs/operators';

import { IReportResponse, ReportDialogFilter} from './report-dialog.data';
import { ReportApi, ReportState } from '../../server-api/report.api';
import { AppUrl } from '../../app.data';


@UntilDestroy()
@Component({
  selector: 'report',
  templateUrl: './report.dialog.html',
  styleUrls: ['./report.dialog.scss']
})
export class ReportDialog {
  state = ReportState;
  minimize: boolean = false;
  results: ReportApi[] = [];

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  constructor(private dialogRef: MatDialogRef<ReportDialog>,
              private simpleHttp: SimpleHttpService) {
  }

  generateReport(filter: ReportDialogFilter): void {
    this.simpleHttp.post<IReportResponse>(AppUrl.ReportGenerate, filter.forGenerate)
      .pipe(
        switchMap(response => this.simpleHttp.get<ReportApi>(null, AppUrl.Report, response.id)),
        untilDestroyed(this)
      )
      .subscribe(result => this.results.push(result));
  }

  getResultsNumber(state?: ReportState): number {
    return state ? this.results.filter(item => item.state === state).length : this.results.length;
  }

  deleteItem(id: number, idx: number): void {
    this.results.splice(idx, 1);
    this.simpleHttp.delete(AppUrl.Report, id)
      .pipe(untilDestroyed(this))
      .subscribe();
  }
}
