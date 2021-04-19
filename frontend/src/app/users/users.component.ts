import { Component } from '@angular/core';
import { ConfirmDialogData, ConfirmDialogService, EntitiesParams, EntityService } from 'ng-project-helper';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { SessionService } from '../services/session.service';
import { UserApi } from '../server-api';
import { AppUrl } from '../app.data';


@UntilDestroy()
@Component({
  selector: 'users-page',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  inputFlex = '160px';
  isAdmin: boolean = false;

  search: string = '';

  users$: Observable<UserApi[]>;
  userParams: EntitiesParams<UserApi>;

  constructor(private confirmDialogService: ConfirmDialogService,
              private sessionService: SessionService,
              private entityService: EntityService,
              private toastrService: ToastrService,
              private dialog: MatDialog) {
    this.isAdmin = this.sessionService.isAdmin;
    this.resetUserParams();
  }

  clearQuery() {
    this.search = '';
  }

  openUserDialog(data: UserApi = new UserApi()) {
    this.dialog.open(UserDialogComponent, {data, disableClose: true, width: '800px'})
      .afterClosed()
      .pipe(
        switchMap(result => this.checkUserDialogResult(result)),
        untilDestroyed(this)
      )
      .subscribe(() => this.completeAction('Пользователь сохранён'));
  }

  openDeleteDialog(user: UserApi) {
    const message = `Удалить пользователя ${user.lastName} ${user.firstName} / ${user.username}?`;
    const data = new ConfirmDialogData(message, 'Удаление пользователя', 'Удалить', 'Отмена');
    this.confirmDialogService.openConfirmDialogWithResult(data, {disableClose: true})
      .pipe(
        switchMap(result => this.checkDeletedDialogResult(result, user.id)),
        untilDestroyed(this)
      )
      .subscribe(() => this.completeAction('Пользователь удалён'));
  }

  private checkUserDialogResult(result: UserApi): Observable<UserApi> {
    if (result) {
      return this.createOrUpdateUser(result);
    }

    return of();
  }

  private checkDeletedDialogResult(result: boolean, userId: number): Observable<boolean> {
    if (result) {
      return this.entityService.deleteEntity(userId, AppUrl.User);
    }

    return of();
  }

  private createOrUpdateUser(user: UserApi): Observable<UserApi> {
    if (user.id) {
      return this.entityService.updateEntity(user, user.id, AppUrl.User, UserApi);
    }
    return this.entityService.createEntity(user, AppUrl.User, UserApi);
  }

  private completeAction(message: string) {
    this.toastrService.success(message);
    this.resetUserParams();
  }

  private resetUserParams(): void {
    this.userParams = new EntitiesParams<UserApi>(AppUrl.User, UserApi, {ordering: 'last_name'}, 'search');
  }
}
