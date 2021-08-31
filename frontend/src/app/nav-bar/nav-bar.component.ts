// src/app/nav-bar/nav-bar.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../state.interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public boardsCount$!: Observable<number>;
  public loggedUser$!: Observable<string | undefined>;
  public currentCredits$!: Observable<number>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.boardsCount$ = this.store
      .select((state) => state.boards?.boards)
      .pipe(map((boards) => boards?.length));

    this.currentCredits$ = this.store.select(
      (state) => state.credits.summary.current
    );

    this.loggedUser$ = this.store
      .select((state) => state.login.user)
      .pipe(map((loggedUser) => loggedUser?.email));
  }
}
