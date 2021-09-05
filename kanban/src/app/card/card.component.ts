import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardService, Card } from '../board.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: Card;
  @Input() apiUrl!: string;
  @Output() onRemoved = new EventEmitter<void>();

  constructor(private readonly boardService: BoardService) {}

  public onModelChange() {
    this.boardService.updateCard(this.apiUrl, this.card).subscribe();
  }

  public removeCard() {
    this.boardService
      .removeCard(this.apiUrl, this.card)
      .subscribe(() => this.onRemoved.emit());
  }
}
