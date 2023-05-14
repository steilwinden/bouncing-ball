import {createFeature, createReducer, on} from '@ngrx/store';
import {BallActions} from './ball.actions';

export const ballFeatureKey = 'ball';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(BallActions.loadBalls, state => state),
  on(BallActions.loadBallsSuccess, (state, action) => state),
  on(BallActions.loadBallsFailure, (state, action) => state),
);

export const ballFeature = createFeature({
  name: ballFeatureKey,
  reducer,
});

