import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Column {
  id: string;
  name: string;
  boardId: string;
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private readonly http: HttpClient) {}

  fetchBoard(apiUrl: string, uuid: string): Observable<Board> {
    return this.http.get<Board>(`${apiUrl}/boards/${uuid}`);
  }
}
