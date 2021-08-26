import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeUserAction } from 'src/app/users.actions';
import { User } from '../users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() user: User;

  constructor(private readonly store: Store) {}

  removeUser() {
    this.store.dispatch(removeUserAction({ user: this.user }));
  }
}
