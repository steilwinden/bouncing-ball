import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBall from './ball.reducer';
import {BallState} from './ball.reducer';

export const selectBallState = createFeatureSelector<fromBall.BallState>(
  fromBall.ballFeatureKey
);

export const selectBallPosition = createSelector(
  selectBallState,
  (state: BallState) => ({x: state.x, y: state.y})
);
