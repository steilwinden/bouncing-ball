import {createActionGroup, emptyProps, props} from "@ngrx/store";

export const BallActions = createActionGroup({
  source: 'Ball',
  events: {
    'move ball': emptyProps(),
    'set ball speed': props<{ vx: number, vy: number }>()
  }
});
