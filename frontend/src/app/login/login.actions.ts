// src/app/users.actions.ts (git)
import { createAction, props } from '@ngrx/store';
import { LoggedUser } from './login.service';

export const loginAction = createAction(
  'loginAction',
  props<{ user: LoggedUser }>()
);

export const disconnectAction = createAction('disconnectAction');
