// src/app/users.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { disconnectAction, loginAction } from './login.actions';
import { LoginUser } from './login.service';

export interface LoginState {
  user: LoginUser;
}

export const initialState: LoginState = { user: undefined };

const _loginReducer = createReducer(
  initialState,
  on(loginAction, (state, { user }) => ({
    ...state,
    user: user,
  })),
  on(disconnectAction, (state) => ({
    ...state,
    user: undefined,
  }))
);

export function loginReducer(state, action) {
  return _loginReducer(state, action);
}
