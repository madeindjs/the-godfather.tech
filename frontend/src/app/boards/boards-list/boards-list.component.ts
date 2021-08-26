import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state.interface';
import { Board, BoardsService } from '../boards.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit {
  public boards$: Observable<Board[]>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boards$ = this.store.select((state) => state.boards.boards);
  }
}
