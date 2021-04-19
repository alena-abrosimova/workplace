import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './directory.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [DirectoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DirectoryComponent}]),
    FlexLayoutModule
  ]
})
export class DirectoryModule {
}
