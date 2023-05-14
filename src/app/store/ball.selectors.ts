import {createFeatureSelector} from '@ngrx/store';
import * as fromBall from './ball.reducer';

export const selectBallState = createFeatureSelector<fromBall.State>(
  fromBall.ballFeatureKey
);
