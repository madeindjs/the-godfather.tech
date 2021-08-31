import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { disconnectAction } from 'src/app/login/login.actions';
import { LoggedUser, LoginService } from 'src/app/login/login.service';
import { AppState } from 'src/app/state.interface';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  @Input() loggedUser: LoggedUser | undefined | null;

  loggedInformation$!: Observable<object>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loggedInformation$ = this.loginService.getLoggedUserInformation();
  }

  get email() {
    return this.loggedUser?.email;
  }

  disconnect() {
    this.store.dispatch(disconnectAction());
  }
}
