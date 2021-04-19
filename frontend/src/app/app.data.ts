import { MatFormFieldDefaultOptions } from '@angular/material/form-field/form-field';
import { AppService } from './app.service';


export function appServiceFactory(appService: AppService): () => void {
  return () => appService.initializeApp();
}

export const DEFAULT_FORM_FIELD_OPTIONS: MatFormFieldDefaultOptions = {
  appearance: 'outline',
  floatLabel: 'always'
};

export const ParamsUrlRegExp: RegExp = new RegExp(/\?\S+/, 'gm');

class AppUrlModel {
  Activity: string;
  ActivityType: string;
  ActivityTimer: string;
  ActivityTimerSettings: string;
  ActivityValidate: string;
  Direction: string;
  MonthActivity: string;
  Project: string;
  Report: string;
  ReportGenerate: string;
  ReportDownload: string;
  Role: string;
  User: string;
  WeekActivity: string;
}

export const AppUrl: AppUrlModel = {
  Activity: '/workplace/api/activity',
  ActivityType: '/workplace/api/activity-type',
  ActivityTimer: '/workplace/api/activity-timer',
  ActivityTimerSettings: '/workplace/api/activity-timer-settings',
  ActivityValidate: '/workplace/api/activity/validate',
  Direction: '/workplace/api/direction',
  MonthActivity: '/workplace/api/activity/month',
  Project: '/workplace/api/project',
  Report: '/workplace/api/report',
  ReportGenerate: '/workplace/api/report/generate',
  ReportDownload: '/workplace/api/report/download',
  Role: '/workplace/api/role',
  User: '/workplace/api/user',
  WeekActivity: '/workplace/api/activity/week'
};
