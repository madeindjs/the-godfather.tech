// src/app/users.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { setUsersAction } from '../users.actions';

export interface User {
  uuid: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'any',
})
export class UsersService {
  constructor(private readonly http: HttpClient, private store: Store) {}

  public getUsers() {
    return this.http
      .get<{ data: User[] }>('https://fakerapi.it/api/v1/users')
      .pipe(
        map((res) => res.data),
        map((users) => {
          this.store.dispatch(setUsersAction({ users }));
          return users;
        })
      );
  }
}
