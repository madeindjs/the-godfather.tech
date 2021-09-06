import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, share } from 'rxjs/operators';
import { Board, BoardService, Column } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() uuid!: string;
  @Input() apiUrl!: string;

  board$!: Observable<Board>;
  name$!: Observable<string>;
  columns$!: Observable<Column[]>;

  constructor(private readonly boardService: BoardService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchBoard();
  }

  ngOnInit(): void {
    this.fetchBoard();
  }

  fetchBoard() {
    this.board$ = this.boardService
      .fetchBoard(this.apiUrl, this.uuid)
      .pipe(share());

    this.name$ = this.board$.pipe(map((board) => board.name));
    this.columns$ = this.board$.pipe(
      mergeMap((board) => this.boardService.getColumns(board))
    );
  }
}
