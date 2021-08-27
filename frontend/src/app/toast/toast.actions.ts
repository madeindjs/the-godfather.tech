// frontend/src/app/toast/toast.actions.ts
import { createAction, props } from '@ngrx/store';
import { Toast } from './toast.service';

export const displayToastAction = createAction(
  'displayToastAction',
  props<{ toast: Toast }>()
);

export const hideToastAction = createAction(
  'hideToastAction',
  props<{ toast: Toast }>()
);
