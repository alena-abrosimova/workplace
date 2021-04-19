import { Route } from '@angular/router';


export const PROFILE_ROUTES: Route[] = [
  {
    path: 'card',
    loadChildren: () => import('./profile-card/profile-card.module').then(m => m.ProfileCardModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: '',
    redirectTo: 'card',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'card',
    pathMatch: 'full'
  },
];
