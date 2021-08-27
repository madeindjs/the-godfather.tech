// src/app/users.actions.ts (git)
import { createAction, props } from '@ngrx/store';
import { CreditsSummary } from './credits.service';

export const setCreditsSummaryAction = createAction(
  'setCreditsSummaryAction',
  props<{ summary: CreditsSummary }>()
);
