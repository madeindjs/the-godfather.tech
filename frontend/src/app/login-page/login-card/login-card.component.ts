import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { disconnectAction } from 'src/app/login/login.actions';
import { LoginUser } from 'src/app/login/login.service';
import { AppState } from 'src/app/state.interface';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent {
  @Input() loggedUser: LoginUser;
  constructor(private readonly store: Store<AppState>) {}

  get email() {
    return this.loggedUser?.email;
  }

  disconnect() {
    this.store.dispatch(disconnectAction());
  }
}
