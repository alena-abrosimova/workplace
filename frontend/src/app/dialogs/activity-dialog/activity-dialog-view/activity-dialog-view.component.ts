import { Component, Input } from '@angular/core';
import { ActivityApi } from '../../../server-api';


@Component({
  selector: 'activity-dialog-view',
  templateUrl: './activity-dialog-view.component.html',
  styleUrls: ['./activity-dialog-view.component.scss']
})
export class ActivityDialogViewComponent {
  @Input() item: ActivityApi;
}
