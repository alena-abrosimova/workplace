import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserApi } from '../../server-api';



@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() users: UserApi[];
  @Input() isAdmin: boolean;

  @Output() editUserEvent = new EventEmitter<UserApi>();
  @Output() deleteUserEvent = new EventEmitter<UserApi>();

  noAvatarUrl = 'assets/images/no-image.png';

  editUser(user: UserApi) {
    this.editUserEvent.emit(user);
  }

  deleteUser(user: UserApi) {
    this.deleteUserEvent.emit(user);
  }
}
