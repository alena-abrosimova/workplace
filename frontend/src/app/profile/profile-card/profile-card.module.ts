import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from './profile-card.component';
import { ProfileAvatarComponent } from './profile-avatar';
import { ChangePasswordDialogComponent } from './change-password-dialog';
import { AvatarEditorDialogComponent } from './avatar-editor-dialog';
import { RouterModule } from '@angular/router';
import { PhoneMaskDirectiveModule } from '../../directives/phone-mask';
import { ImageViewerDialogModule } from '../../dialogs/image-viewer-dialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ControlErrorModule } from 'ng-project-helper';


@NgModule({
  declarations: [
    ProfileCardComponent,
    ProfileAvatarComponent,
    ChangePasswordDialogComponent,
    AvatarEditorDialogComponent
  ],
  imports: [
    RouterModule.forChild([{path: '', component: ProfileCardComponent}]),
    PhoneMaskDirectiveModule,
    ImageViewerDialogModule,
    ImageCropperModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    FlexModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ControlErrorModule,
  ],
  exports: [ProfileCardComponent]
})
export class ProfileCardModule {
}
