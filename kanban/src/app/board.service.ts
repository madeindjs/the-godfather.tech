import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

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
}

export interface CompleteBoard extends Board {
  columns: Column[];
  cards: Card[];
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private boards = new Map<string, BehaviorSubject<Board>>();
  private cards$ = new BehaviorSubject<Card[]>([]);
  private columns$ = new BehaviorSubject<Column[]>([]);

  constructor(private readonly http: HttpClient) {}

  fetchBoard(apiUrl: string, uuid: string): Observable<Board> {
    return this.http.get<CompleteBoard>(`${apiUrl}/boards/${uuid}`).pipe(
      tap(() => this.initializeSee(apiUrl, uuid)),
      mergeMap((board) => this.updateBoardCollection(board))
    );
  }

  getColumns(board: Board): Observable<Column[]> {
    return this.columns$.pipe(
      map((columns) => columns.filter(({ boardId }) => boardId === board.id))
    );
  }

  getCards(column: Column): Observable<Card[]> {
    return this.cards$.pipe(
      map((cards) => cards.filter(({ columnId }) => columnId === column.id))
    );
  }

  createCard(
    apiUrl: string,
    { boardId, columnId }: { columnId: string; boardId: string }
  ) {
    return this.http
      .post<Card>(`${apiUrl}/cards/`, { boardId, columnId })
      .pipe(tap((card) => this.cards$.next([...this.cards$.value, card])));
  }

  updateCard(apiUrl: string, card: Card) {
    return this.http.put<Card>(`${apiUrl}/cards/${card.id}`, card);
  }

  removeCard(apiUrl: string, card: Card) {
    return this.http.delete<Card>(`${apiUrl}/cards/${card.id}`).pipe(
      tap(() => {
        const cards = this.cards$.value;
        this.cards$.next(cards.filter(({ id }) => id !== card.id));
      })
    );
  }

  private updateBoardCollection(board: CompleteBoard): BehaviorSubject<Board> {
    const board$ = this.boards.get(board.id);

    if (board$) {
      board$.next(board);

      this.columns$.next([
        ...this.columns$.value.filter(({ boardId }) => boardId !== board.id),
        ...board.columns,
      ]);
      this.cards$.next([
        ...this.cards$.value.filter(({ boardId }) => boardId !== board.id),
        ...board.cards,
      ]);

      return board$;
    } else {
      const newBoard$ = new BehaviorSubject<Board>({
        id: board.id,
        name: board.name,
      });
      this.boards.set(board.id, newBoard$);
      this.columns$.next([...this.columns$.value, ...board.columns]);
      this.cards$.next([...this.cards$.value, ...board.cards]);
      return newBoard$;
    }
  }

  private initializeSee(apiUrl: string, uuid: string) {
    const eventSource = new EventSource(`${apiUrl}/boards/${uuid}/sse`);
    eventSource.onmessage = ({ data }) => {
      const board: CompleteBoard = JSON.parse(data);
      console.group('SSE');
      console.log('Receive an update for board %o', board);
      console.groupEnd();
      this.updateBoardCollection(board);
    };
    eventSource.onerror = () => this.initializeSee(apiUrl, uuid);
  }
}
