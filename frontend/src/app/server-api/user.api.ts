import { Exclude, Transform } from 'class-transformer';
import { dateToClass, dateToPlain } from 'ng-project-helper';


export class UserApi {
  id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  role?: string;
  online?: boolean;

  avatar?: string;

  @Transform(dateToPlain(), { toPlainOnly: true })
  @Transform(dateToClass(), { toClassOnly: true })
  birthday?: Date;

  @Transform(dateToPlain(), { toPlainOnly: true })
  @Transform(dateToClass(), { toClassOnly: true })
  lastLogin?: Date;
}

export class RoleApi {
  name: string;
  label: string;
}

export class UserPasswordApi {
  newPassword: string;
  oldPassword: string;
  @Exclude()
  repeatPassword: string;
}
