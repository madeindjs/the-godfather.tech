import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';
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
  ) // private readonly toastService: ToastService
  {}

  getToken(): Observable<string | undefined> {
    return this.store
      .select((state: AppState) => state.login?.user?.token)
      .pipe(take(1));
  }

  getLoggedUserInformation() {
    return this.http.get(`${environment.backend.url}/users/me`);
  }

  login(user: LoginUser) {
    return this.http
      .post(`${environment.backend.url}/auth`, {
        email: user.email,
        password: user.password,
      })
      .pipe(
        tap((res) =>
          this.store.dispatch(
            loginAction({
              user: { email: user.email, token: (res as any).access_token },
            })
          )
        )
        // TODO this made tests fail
        // tap(() => this.toastService.success('Welcome!'))
      );
  }

  signUp(user: LoginUser) {
    return this.http
      .post(`${environment.backend.url}/users`, {
        email: user.email,
        password: user.password,
      })
      .pipe(
        tap((res) =>
          this.store.dispatch(
            loginAction({
              user: { email: user.email, token: (res as any).access_token },
            })
          )
        ),
        mergeMap(() =>
          this.http.post(`${environment.backend.url}/auth`, {
            email: user.email,
            password: user.password,
          })
        )
      );
  }

  disconnect() {
    this.store.dispatch(disconnectAction());
  }
}
