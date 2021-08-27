// src/app/boards.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { setBoardsAction } from '../boards.actions';

export interface Board {
  id: string;
}

@Injectable({
  providedIn: 'any',
})
export class BoardsService {
  constructor(private readonly http: HttpClient, private store: Store) {}

  create() {
    return this.http
      .post<Board>(`${environment.backend.url}/boards`, {})
      .pipe(mergeMap(() => this.getAll()));
  }

  remove(id: string) {
    return this.http
      .delete<Board>(`${environment.backend.url}/boards/${id}`)
      .pipe(mergeMap(() => this.getAll()));
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
