import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSidebarComponent } from './app-sidebar.component';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AppSidebarComponent],
  imports: [
    CommonModule,
    FlexModule,
    MatIconModule,
    RouterModule
  ],
  exports: [AppSidebarComponent]
})
export class AppSidebarModule { }
