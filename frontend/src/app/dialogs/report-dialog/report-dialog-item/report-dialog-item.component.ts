import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { isOnChanges, SimpleFileService, SimpleHttpService } from 'ng-project-helper';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ReportApi, ReportState } from '../../../server-api/report.api';
import { AppUrl } from '../../../app.data';


@UntilDestroy()
@Component({
  selector: 'report-dialog-item',
  templateUrl: './report-dialog-item.component.html',
  styleUrls: ['./report-dialog-item.component.scss']
})
export class ReportDialogItemComponent implements OnChanges, OnDestroy {
  @Input() item: ReportApi;
  @Output() deleteEvent: EventEmitter<null> = new EventEmitter<null>();

  state = ReportState;

  timerId: number;

  constructor(private simpleHttpService: SimpleHttpService,
              private simpleFileService: SimpleFileService) {
  }

  ngOnDestroy(): void {
    window.clearTimeout(this.timerId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChanges(changes.item)) {
      this.checkStatus(this.item);
    }
  }

  getAndCheckStatus(): void {
    this.simpleHttpService.get<ReportApi>(null, AppUrl.Report, this.item.id)
      .pipe(untilDestroyed(this))
      .subscribe(result => this.checkStatus(result));
  }

  checkStatus(result: ReportApi): void {
    this.item.state = result.state;
    if (result.state === this.state.process) {
      this.timerId = window.setTimeout(() => this.getAndCheckStatus(), 10000);
    }
  }

  downloadFile(): void {
    this.simpleFileService.downloadFile(`${AppUrl.Report}/${this.item.id}/download/`, 'application/octet-stream')
      .pipe(untilDestroyed(this))
      .subscribe();
  }
}
