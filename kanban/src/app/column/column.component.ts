import { Component, Input } from '@angular/core';
import { BoardService, Card, Column } from '../board.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: Column;
  @Input() cards!: Card[];
  @Input() apiUrl!: string;

  constructor(private readonly boardService: BoardService) {}

  createCard() {
    return this.boardService
      .createCard(this.apiUrl, {
        boardId: this.column.boardId,
        columnId: this.column.id,
      })
      .subscribe();
  }
}
