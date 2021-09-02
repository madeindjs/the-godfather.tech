// src/app/boards.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { setBoardsAction } from '../boards.actions';
import { CreditsService } from '../credits/credits.service';

export interface Board {
  id: string;
}

@Injectable({
  providedIn: 'any',
})
export class BoardsService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store,
    private readonly creditsService: CreditsService
  ) // private readonly toastService: ToastService
  {}

  create() {
    return this.http.post<Board>(`${environment.backend.url}/boards`, {}).pipe(
      mergeMap(() => this.getAll()),
      mergeMap(() => this.creditsService.getSummary())
      // tap(() => this.toastService.success('Board created'))
    );
  }

  remove(id: string) {
    return this.http
      .delete<Board>(`${environment.backend.url}/boards/${id}`)
      .pipe(
        mergeMap(() => this.getAll())
        // TODO this made tests fail
        // tap(() => this.toastService.success('Board removed'))
      );
  }

  getAll() {
    return this.http.get<Board[]>(`${environment.backend.url}/boards`).pipe(
      map((boards) => {
        this.store.dispatch(setBoardsAction({ boards }));
        return boards;
      })
    );
  }
}
