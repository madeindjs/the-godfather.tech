import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state.interface';
import { disconnectAction, loginAction } from './login.actions';

export interface LoginUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'any',
})
export class LoginService {
  loggedUser = this.store.select((state) => state.login.user);

  constructor(private store: Store<AppState>) {}

  login(user: LoginUser) {
    return this.store.dispatch(loginAction({ user }));
  }

  disconnect() {
    this.store.dispatch(disconnectAction());
  }
}
