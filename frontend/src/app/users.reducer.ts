// src/app/users.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { removeUserAction, setUsersAction } from './users.actions';
import { User } from './users/users.service';

export interface UsersState {
  users: User[];
}

export const initialState: UsersState = { users: [] };

const _usersReducer = createReducer(
  initialState,
  on(setUsersAction, (state, { users }) => ({
    ...state,
    users: users,
  })),
  on(removeUserAction, (state, { user }) => ({
    ...state,
    users: state.users.filter(({ email }) => user.email !== email),
  }))
);

export function usersReducer(state, action) {
  return _usersReducer(state, action);
}
