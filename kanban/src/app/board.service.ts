import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

export interface Card {
  id: string;
  name: string;
  description: string;
  boardId: string;
  columnId: string;
}

export interface Column {
  id: string;
  name: string;
  boardId: string;
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
  cards: Card[];
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private boards = new Map<string, BehaviorSubject<Board>>();

  constructor(private readonly http: HttpClient) {}

  fetchBoard(apiUrl: string, uuid: string): Observable<Board> {
    return this.http
      .get<Board>(`${apiUrl}/boards/${uuid}`)
      .pipe(mergeMap((board) => this.updateBoardCollection(board)));
  }

  createCard(
    apiUrl: string,
    { boardId, columnId }: { columnId: string; boardId: string }
  ) {
    return this.http
      .post<Board>(`${apiUrl}/cards/`, { boardId, columnId })
      .pipe(tap((board) => this.updateBoardCollection(board)));
  }

  updateCard(apiUrl: string, card: Card) {
    return this.http.put<Board>(`${apiUrl}/cards/${card.id}`, card);
  }

  removeCard(apiUrl: string, card: Card) {
    return this.http
      .delete<Board>(`${apiUrl}/cards/${card.id}`)
      .pipe(tap((board) => this.updateBoardCollection(board)));
  }

  private updateBoardCollection(board: Board): BehaviorSubject<Board> {
    const board$ = this.boards.get(board.id);

    if (board$) {
      board$.next(board);
      return board$;
    } else {
      const newBoard$ = new BehaviorSubject<Board>(board);
      this.boards.set(board.id, newBoard$);
      return newBoard$;
    }
  }
}
