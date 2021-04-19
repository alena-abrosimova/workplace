import { Routes } from '@angular/router';


export const ACTIVITY_ROUTES: Routes = [
  {
    path: 'day',
    loadChildren: () => import('./day-activity/day-activity.module').then(m => m.DayActivityModule)
  },
  {
    path: 'week',
    loadChildren: () => import('./week-activity/week-activity.module').then(m => m.WeekActivityModule)
  },
  {
    path: 'month',
    loadChildren: () => import('./month-activity/month-activity.module').then(m => m.MonthActivityModule)
  },
  {
    path: '',
    redirectTo: 'day',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'day',
    pathMatch: 'full'
  },
];
