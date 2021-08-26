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
  public usersCount$: Observable<number>;
  public loggedUser$: Observable<string | undefined>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.usersCount$ = this.store
      .select((state) => state.users.users)
      .pipe(map((users) => users.length));

    this.loggedUser$ = this.store
      .select((state) => state.login.user)
      .pipe(map((loggedUser) => loggedUser?.email));
  }
}
