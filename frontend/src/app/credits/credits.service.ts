import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppState } from '../state.interface';
import { ToastService } from '../toast/toast.service';
import { setCreditsSummaryAction } from './credits.actions';

export interface CreditsSummary {
  total: number;
  current: number;
}

@Injectable({
  providedIn: 'root',
})
export class CreditsService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store<AppState>,
    private readonly toastService: ToastService
  ) {}

  getSummary(): Observable<CreditsSummary> {
    return this.http
      .get<CreditsSummary>(`${environment.backend.url}/credits/summary`)
      .pipe(
        tap((summary) =>
          this.store.dispatch(setCreditsSummaryAction({ summary }))
        )
        // mergeMap(() => this.store.select((state) => state.credits.summary))
      );
  }

  buy(amount: number = 10): Observable<void> {
    return this.http
      .post<void>(`${environment.backend.url}/credits`, {
        amount,
      })
      .pipe(
        tap(() => this.getSummary().subscribe()),
        tap(() =>
          this.toastService.success(`You just bought ${amount} credits`)
        )
      );
  }
}
