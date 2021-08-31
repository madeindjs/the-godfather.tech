import { Component, Input } from '@angular/core';
import { Board, BoardsService } from '../boards.service';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() board!: Board;

  constructor(private readonly boardsService: BoardsService) {}

  removeBoard() {
    this.boardsService.remove(this.board.id).subscribe();
  }
}
