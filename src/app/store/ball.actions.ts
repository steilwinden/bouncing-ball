import {createAction, props} from "@ngrx/store";

export const moveBall = createAction(
  '[Ball] move ball'
);

export const setBallSpeed = createAction(
  '[Ball] set ball speed',
  props<{ vx: number, vy: number }>()
);
