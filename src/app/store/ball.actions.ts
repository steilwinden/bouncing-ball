import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const BallActions = createActionGroup({
  source: 'Ball',
  events: {
    'Load Balls': emptyProps(),
    'Load Balls Success': props<{ data: unknown }>(),
    'Load Balls Failure': props<{ error: unknown }>(),
  }
});
