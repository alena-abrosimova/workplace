import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ClearedReportsFilter, ReportsFilters } from '../reports.data';


@Component({
  selector: 'reports-filters',
  templateUrl: './reports-filters.component.html',
  styleUrls: ['./reports-filters.component.scss']
})
export class ReportsFiltersComponent {
  @Input() filters: ReportsFilters;
  @Output() filtersChange = new EventEmitter<ReportsFilters>();
  @Output() search = new EventEmitter<boolean>();

  clearFilters(): void {
  this.filtersChange.emit(new ReportsFilters(this.filters.user));
  this.applyFilters();
  }

  clearParam(name: ClearedReportsFilter): void {
    this.filters[name] = null;
  }

  applyFilters(): void {
    this.search.emit(true);
  }
}
