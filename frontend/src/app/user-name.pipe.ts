import { Pipe, PipeTransform } from '@angular/core';
import { User } from './users/users.service';

@Pipe({
  name: 'userName',
})
export class UserNamePipe implements PipeTransform {
  transform(user: User, ...args: unknown[]): unknown {
    return `${user.firstname} ${user.lastname.toUpperCase()} <${user.email}>`;
  }
}
