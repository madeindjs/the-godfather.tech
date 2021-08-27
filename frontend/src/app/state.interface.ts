import { BoardsState } from './boards.reducer';
import { CreditsState } from './credits/credits.reducer';
import { LoginState } from './login/login.reducer';
import { ToastsState } from './toast/toast.reducer';

export interface AppState {
  boards: BoardsState;
  login: LoginState;
  credits: CreditsState;
  toasts: ToastsState;
}
