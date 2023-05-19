import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const BallActions = createActionGroup({
  source: 'Ball',
  events: {
    'Start Ball': emptyProps(),
    'Stop Ball': emptyProps(),
    'Change vx': props<{ vx: number }>(),
    'Change vy': props<{ vy: number }>(),
  }
});
