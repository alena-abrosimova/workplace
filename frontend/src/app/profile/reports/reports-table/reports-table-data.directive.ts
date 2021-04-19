import { Directive, TemplateRef } from '@angular/core';
import { CdkCellDef } from '@angular/cdk/table';

import { ReportApi } from '../../../server-api/report.api';


@Directive({
  selector: '[reportTableData]',
  providers: [{provide: CdkCellDef, useExisting: ReportsTableDataDirective}]
})
export class ReportsTableDataDirective extends CdkCellDef {
  constructor(public templateRef: TemplateRef<{ $implicit: ReportApi }>) {
    super(templateRef);
  }
}
