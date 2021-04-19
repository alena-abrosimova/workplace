import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityMenuComponent } from './activity-menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReportDialogModule } from '../../dialogs/report-dialog';
import { FormatDatePipeModule, GetEntitiesModule } from 'ng-project-helper';
import { ActivityMenuTimerPipe } from './activity-menu-timer.pipe';


@NgModule({
  declarations: [ActivityMenuComponent, ActivityMenuTimerPipe],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        ReportDialogModule,
        FormatDatePipeModule,
        GetEntitiesModule
    ],
  exports: [ActivityMenuComponent]
})
export class ActivityMenuModule {
}
