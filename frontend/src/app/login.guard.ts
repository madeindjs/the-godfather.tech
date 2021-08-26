import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppState } from './state.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private readonly store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select((state) => state.login.user)
      .pipe(
        map((user) => Boolean(user)),
        tap((authorized) => {
          if (!authorized) {
            console.error('You do not have permission, please login before');
          }
        })
      );
  }
}
