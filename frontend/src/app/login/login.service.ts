import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppState } from '../state.interface';
import { disconnectAction, loginAction } from './login.actions';

export interface LoginUser {
  email: string;
  password: string;
}
export interface LoggedUser {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'any',
})
export class LoginService {
  loggedUser = this.store.select((state) => state.login.user);

  constructor(
    private store: Store<AppState>,
    private readonly http: HttpClient
  ) {}

  login(user: LoginUser) {
    this.http
      .post(`${environment.backend.url}/auth`, {
        email: user.email,
        password: user.password,
      })
      .subscribe(
        (res: { access_token: string }) => {
          this.store.dispatch(
            loginAction({
              user: { email: user.email, token: res.access_token },
            })
          );
        },
        (e) => {
          console.error(e);
        }
      );
  }

  signUp(user: LoginUser) {
    this.http
      .post(`${environment.backend.url}/users`, {
        email: user.email,
        password: user.password,
      })
      .pipe(
        mergeMap(() =>
          this.http.post(`${environment.backend.url}/auth`, {
            email: user.email,
            password: user.password,
          })
        )
      )
      .subscribe(
        (res: { access_token: string }) => {
          this.store.dispatch(
            loginAction({
              user: { email: user.email, token: res.access_token },
            })
          );
          console.log(res.access_token);
        },
        (e) => {
          console.error(e);
        }
      );
  }

  disconnect() {
    this.store.dispatch(disconnectAction());
  }
}
