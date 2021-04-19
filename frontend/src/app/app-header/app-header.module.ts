import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHeaderComponent } from './app-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [AppHeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexModule,
    MatIconModule,
    RouterModule,
    MatTooltipModule,
    MatSidenavModule
  ],
  exports: [AppHeaderComponent]
})

export class AppHeaderModule {

}
