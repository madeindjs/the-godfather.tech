import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { Board, BoardService, Card, Column } from '../board.service';

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
  columns$: Observable<{ column: Column; cards: Card[] }[]> = of([]);

  constructor(
    private readonly boardService: BoardService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchBoard();
  }

  ngOnInit(): void {
    this.fetchBoard();
  }

  onCardCreated() {
    console.log('onCardCreated');
    // this.cdr.markForCheck();
  }

  onCardRemoved() {
    console.log('onCardRemoved');
    // this.cdr.markForCheck();
  }

  cardTrackBy(index: number, card: Card) {
    return card.id;
  }

  fetchBoard() {
    this.board$ = this.boardService
      .fetchBoard(this.apiUrl, this.uuid)
      .pipe(share());

    this.name$ = this.board$.pipe(map((board) => board.name));
    this.columns$ = this.board$.pipe(
      map((board) =>
        board.columns.map((column) => ({
          column,
          cards: board.cards.filter((card) => card.columnId === column.id),
        }))
      ),
      tap((c) => console.log('trigger change %o', c)),
      tap(() => this.cdr.markForCheck())
    );
  }
}
