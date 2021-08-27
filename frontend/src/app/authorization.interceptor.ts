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
import { ToastService } from './toast/toast.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    private readonly store: Store<AppState>,
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly toastService: ToastService
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
      this.toastService.display({
        type: 'warning',
        message: 'You have been un logged. Please log you again',
      });
      return;
    }

    if (error.status === 402) {
      this.toastService.display({
        type: 'warning',
        message:
          'You have not sufficient credits to do this action. Please buy new one.',
      });
      this.router.navigate(['/login']);
      return;
    }

    console.log(error);

    this.toastService.display({
      type: 'danger',
      message: 'Something bad happens',
    });

    throw error;
  }
}
