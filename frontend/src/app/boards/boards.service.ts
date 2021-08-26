// src/app/boards.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, mergeMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { setBoardsAction } from '../boards.actions';
import { AppState } from '../state.interface';

export interface Board {
  id: string;
}

@Injectable({
  providedIn: 'any',
})
export class BoardsService {
  constructor(private readonly http: HttpClient, private store: Store) {}

  create() {
    return this.getToken().pipe(
      mergeMap((token) =>
        this.http.post<Board>(
          `${environment.backend.url}/boards`,
          {},
          { headers: { Authorization: `bearer ${token}` } }
        )
      ),
      mergeMap(() => this.getAll())
    );
  }

  remove(id: string) {
    return this.getToken().pipe(
      mergeMap((token) =>
        this.http.delete<Board>(`${environment.backend.url}/boards/${id}`, {
          headers: { Authorization: `bearer ${token}` },
        })
      ),
      mergeMap(() => this.getAll())
    );
  }

  getAll() {
    return this.getToken().pipe(
      mergeMap((token) =>
        this.http.get<Board[]>(`${environment.backend.url}/boards`, {
          headers: { Authorization: `bearer ${token}` },
        })
      ),
      map((boards) => {
        this.store.dispatch(setBoardsAction({ boards }));
        return boards;
      })
    );
  }

  private getToken() {
    return this.store
      .select((state: AppState) => state.login.user.token)
      .pipe(take(1));
  }
}
