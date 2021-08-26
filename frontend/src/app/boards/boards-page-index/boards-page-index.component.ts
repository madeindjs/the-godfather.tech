import { Component, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/boards/boards.service';

@Component({
  selector: 'app-boards-page-index',
  templateUrl: './boards-page-index.component.html',
  styleUrls: ['./boards-page-index.component.scss'],
})
export class BoardsPageIndexComponent implements OnInit {
  constructor(private readonly boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boardsService.getAll().subscribe();
  }
  create() {
    this.boardsService.create().subscribe();
  }
}
