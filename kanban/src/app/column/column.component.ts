import { Component, EventEmitter, Input, Output } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BoardService, Column } from '../board.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: Column;
  @Input() apiUrl!: string;
  @Output() onChange = new EventEmitter();

  constructor(private readonly boardService: BoardService) {}

  createCard() {
    return this.boardService
      .createCard(this.apiUrl, {
        boardId: this.column.boardId,
        columnId: this.column.id,
      })
      .pipe(tap(() => this.onChange.emit()))
      .subscribe();
  }
}
