import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BoardService, Card, Column } from '../board.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit, OnChanges {
  @Input() column!: Column;
  @Input() apiUrl!: string;
  cards$!: Observable<Card[]>;

  constructor(private readonly boardService: BoardService) {}

  ngOnInit(): void {
    this.cards$ = this.boardService.getCards(this.column);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.column.currentValue) {
      this.cards$ = this.boardService.getCards(this.column);
    }
  }

  createCard() {
    return this.boardService
      .createCard(this.apiUrl, {
        boardId: this.column.boardId,
        columnId: this.column.id,
      })
      .subscribe();
  }
}
