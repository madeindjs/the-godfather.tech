import { BoardsState } from './boards.reducer';
import { LoginState } from './login/login.reducer';

export interface AppState {
  boards: BoardsState;
  login: LoginState;
}
