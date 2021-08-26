import { LoginState } from './login/login.reducer';
import { UsersState } from './users.reducer';

export interface AppState {
  users: UsersState;
  login: LoginState;
}
