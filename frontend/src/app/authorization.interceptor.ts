import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, ObservableInput } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { disconnectAction } from './login/login.actions';
import { LoginService } from './login/login.service';
import { AppState } from './state.interface';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    private readonly store: Store<AppState>,
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.loginService.getToken().pipe(
      mergeMap((token) => {
        return next
          .handle(
            request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          )
          .pipe(catchError((error) => this.handleError(error)));
      })
    );
  }

  private handleError(error): ObservableInput<any> {
    if (error?.error?.error === 'TokenExpiredError') {
      this.store.dispatch(disconnectAction());
      this.router.navigate(['/login']);
    }
    throw error;
  }
}
