import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { EntityService, SimpleFileService } from 'ng-project-helper';
import { map, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

import { ImageViewerDialogComponent } from '../../../dialogs/image-viewer-dialog';
import { AvatarEditorDialogComponent } from '../avatar-editor-dialog';
import { SessionService } from '../../../services/session.service';
import { UserApi } from '../../../server-api';
import { AppUrl } from '../../../app.data';


@UntilDestroy()
@Component({
  selector: 'profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent {
  userId: number;
  userAvatar: string;
  noAvatarUrl = 'assets/images/no-image.png';

  constructor(private toastrService: ToastrService,
              private entityService: EntityService,
              private fileService: SimpleFileService,
              private sessionService: SessionService,
              private dialog: MatDialog) {
    this.userId = this.sessionService.userId;
    this.userAvatar = this.sessionService.userAvatar;
  }

  deleteAvatar() {
    this.entityService.updateEntity({avatar: null}, this.userId, AppUrl.User, UserApi)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.completeActions(null, null, 'Фото удалено'));
  }

  openImageViewerDialog() {
    this.dialog.open(ImageViewerDialogComponent, {data: [this.userAvatar]});
  }

  changeAvatar(data: Event, input: HTMLInputElement): void {
    this.openAvatarEditorDialog(data)
      .pipe(
        switchMap(avatar => this.checkAvatar(avatar)),
        untilDestroyed(this)
      )
      .subscribe(url => this.completeActions(url, this.getAvatarUrl(url), 'Фото обновлено', input));
  }

  openAvatarEditorDialog(data: Event): Observable<Blob> {
    return this.dialog
      .open(AvatarEditorDialogComponent, {data, maxWidth: '95vw', minWidth: '60vw', disableClose: true})
      .afterClosed();
  }

  checkAvatar(avatar: Blob): Observable<string> {
    if (avatar) {
      return this.uploadAvatar(avatar);
    }

    return of<string>();
  }

  uploadAvatar(avatar: Blob): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', avatar);

    return this.fileService.uploadFile(`${AppUrl.User}/${this.userId}/upload-avatar/`, formData, UserApi)
      .pipe(
        map(result => result.avatar)
      );
  }

  getAvatarUrl(url: string): string {
    return url + `?${new Date().getTime()}`;
  }

  completeActions(avatar: string, avatarUrl: string, message: string, input?: HTMLInputElement): void {
    if (input) {
      input.value = null;
    }
    this.userAvatar = avatarUrl;
    this.sessionService.setAvatar(avatar);
    this.toastrService.success(message);
  }
}
