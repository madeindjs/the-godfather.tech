// src/app/users.actions.ts (git)
import { createAction, props } from '@ngrx/store';
import { LoginUser } from './login.service';

export const loginAction = createAction(
  'loginAction',
  props<{ user: LoginUser }>()
);

export const disconnectAction = createAction('disconnectAction');
