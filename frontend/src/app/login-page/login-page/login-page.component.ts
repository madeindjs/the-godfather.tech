import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/login/login.service';
import { AppState } from 'src/app/state.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginUser$: Observable<LoginUser>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.loginUser$ = this.store.select((state) => state.login.user);
  }
}
