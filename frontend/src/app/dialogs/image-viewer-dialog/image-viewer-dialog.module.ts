import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerDialogComponent } from './image-viewer-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ImageViewerDialogComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class ImageViewerDialogModule {
}
