import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SessionService } from '../../services/session.service';
import { ReportApi } from '../../server-api/report.api';
import { ReportsFilters } from './reports.data';


@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  filters = new ReportsFilters(this.sessionService.userId);
  params = this.filters.getEntitiesParams();
  reports$: Observable<ReportApi[]>;

  constructor(private sessionService: SessionService) {
  }

  resetReportParams(search: boolean): void {
    this.filters.setFiltersCount();
    this.params = this.filters.getEntitiesParams(search);
  }

  setLength(count: number): void {
    this.filters.setLength(count);
  }
}
