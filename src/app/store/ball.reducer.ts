import {createReducer, on} from '@ngrx/store';
import {BallComponent} from "../ball/ball.component";
import * as BallActions from './ball.actions';

export const ballFeatureKey = 'ball';

export interface BallState {
  x: number; // Startposition X
  y: number; // Startposition Y
  vx: number; // Geschwindigkeit X
  vy: number; // Geschwindigkeit Y
}

export const initialBallState: BallState = {
  x: 50,
  y: 50,
  vx: 5,
  vy: 2,
};

export const reducer = createReducer(
  initialBallState,

  on(BallActions.moveBall, state => {
    let vx = state.vx;
    let vy = state.vy;
    let x = state.x;
    let y = state.y;

    // Kollision mit den Rändern überprüfen
    if (x + vx > BallComponent.CANVAS_SIZE - BallComponent.RADIUS || x + vx < BallComponent.RADIUS) {
      vx = -vx;
    }
    if (y + vy > BallComponent.CANVAS_SIZE - BallComponent.RADIUS || y + vy < BallComponent.RADIUS) {
      vy = -vy;
    }
    // Neue Position berechnen
    x += vx;
    y += vy;

    return {...state, x: x, y: y, vx: vx, vy: vy};
  }),

  on(BallActions.setBallSpeed, (state, {vx, vy}) => {
    if (vx < 1 || vy < 1) {
      return state;
    }
    let vxNeu = Math.sign(state.vx) * vx;
    let vyNeu = Math.sign(state.vy) * vy;
    return {...state, vx: vxNeu, vy: vyNeu};
  }),
);

// export const ballFeature = createFeature({
//   name: ballFeatureKey,
//   reducer,
// });
