import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BaseTableComponent, ConfirmDialogService, isOnChanges, SimpleFileService, SimpleHttpService } from 'ng-project-helper';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

import { ReportApi } from '../../../server-api/report.api';
import { ReportsFilters } from '../reports.data';
import { AppUrl } from '../../../app.data';


@UntilDestroy()
@Component({
  selector: 'reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent extends BaseTableComponent<ReportApi> implements OnChanges {
  @Input() items: ReportApi[];
  @Input() params: ReportsFilters;
  @Output() paramsChange = new EventEmitter<ReportsFilters>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['label', 'started', 'ended', 'created', 'actions'];

  constructor(private simpleHttpService: SimpleHttpService,
              private simpleFileService: SimpleFileService,
              private confirmService: ConfirmDialogService,
              private toastrService: ToastrService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChanges(changes.items)) {
      this.prepareTable(this.items);
    }
  }

  downloadFile(id: number): void {
    this._downloadFile(id)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  deleteItem(id: number): void {
    this.openConfirmationDialog()
      .pipe(
        switchMap(result => this.checkResultAndDelete(result, id)),
        untilDestroyed(this)
      )
      .subscribe(() => this.completeActions());
  }

  private openConfirmationDialog(): Observable<boolean> {
    return this.confirmService.openConfirmDialogWithResult();
  }

  private checkResultAndDelete(result: boolean, id: number): Observable<boolean> {
    return result ? this.simpleHttpService.delete(AppUrl.Report, id) : of<boolean>();
  }

  private _downloadFile(id: number): Observable<Blob> {
    return this.simpleFileService.downloadFile(`${AppUrl.Report}/${id}/download/`, 'application/octet-stream');
  }

  private completeActions(): void {
    this.toastrService.success('Удалено');
    this.paramsChange.emit(this.params);
  }
}
