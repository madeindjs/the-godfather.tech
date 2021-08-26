// src/app/users.actions.ts (git)
import { createAction, props } from '@ngrx/store';
import { User } from './users/users.service';

export const setUsersAction = createAction(
  'setUsersAction',
  props<{ users: User[] }>()
);

export const removeUserAction = createAction(
  'removeUserAction',
  props<{ user: User }>()
);
