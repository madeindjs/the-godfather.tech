import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state.interface';
import { User } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public users: Observable<User[]>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.users = this.store.select((state) => state.users.users);
  }
}
