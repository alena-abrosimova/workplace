import { Routes } from '@angular/router';


export const ADMIN_ROUTES: Routes = [
  {
    path: 'directory',
    loadChildren: () => import('./directory/directory.module').then(m => m.DirectoryModule)
  },
  {
    path: 'directory/:id',
    loadChildren: () => import('./directory-card/directory-card.module').then(m => m.DirectoryCardModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: '',
    redirectTo: 'directory',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'directory',
    pathMatch: 'full'
  },
];
