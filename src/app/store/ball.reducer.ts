import {createFeature, createReducer, on} from '@ngrx/store';
import {BallActions} from './ball.actions';

export const ballFeatureKey = 'ball';

export interface State {
  x: number; // Startposition X
  y: number; // Startposition Y
  vx: number; // Geschwindigkeit X
  vy: number; // Geschwindigkeit Y
  radius: number; // Radius des Balls
  ballRunning: boolean; // Zustand des Balls (gestartet oder gestoppt)
  animationId: number; // ID der Animationsanfrage
}

export const initialState: State = {
  x: 50,
  y: 50,
  vx: 5,
  vy: 2,
  radius: 20,
  ballRunning: false,
  animationId: 0
};

export const reducer = createReducer(
  initialState,

  on(BallActions.startBall, state => {
    return {...state, ballRunning: true};
  }),

  on(BallActions.stopBall, state => {
    return {...state, ballRunning: false};
  }),

  on(BallActions.changeVx, (state, action) => {
    return {...state, vx: action.vx};
  }),

  on(BallActions.changeVy, (state, action) => {
    return {...state, vy: action.vy};
  }),

);

export const ballFeature = createFeature({
  name: ballFeatureKey,
  reducer,
});

