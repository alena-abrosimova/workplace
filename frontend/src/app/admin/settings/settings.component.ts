import { Component } from '@angular/core';
import { EntityApiParams, SaveEntityParams } from 'ng-project-helper';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { TimerSettings } from '../../server-api/timer.api';
import { AppUrl } from '../../app.data';


@Component({
  selector: 'settings-page',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  timerEndedCtrl: FormControl = new FormControl({value: null, disabled: true});
  timerSettingsParams = new EntityApiParams(AppUrl.ActivityTimerSettings, 1, TimerSettings);
  timerSettingsSaveParams: SaveEntityParams<TimerSettings>;
  timerSettings$: Observable<TimerSettings>;
  timerSettings: TimerSettings;

  setTimerEnded(timerSettings: TimerSettings): void {
    this.timerSettings = timerSettings;
    this.timerEndedCtrl.setValue(timerSettings.ended);
    this.timerEndedCtrl.disable();
  }

  clearEnded(): void {
    this.timerEndedCtrl.setValue(this.timerSettings.ended);
    this.timerEndedCtrl.disable();
  }

  setTimerSaveParams(): void {
    this.timerSettingsSaveParams = new SaveEntityParams(
      AppUrl.ActivityTimerSettings,
      {ended: this.timerEndedCtrl.value, id: 1},
      TimerSettings,
      false,
      'id'
    );
  }
}
