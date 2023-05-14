import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {BallActions} from './ball.actions';


@Injectable()
export class BallEffects {

  loadBalls$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BallActions.loadBalls),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => BallActions.loadBallsSuccess({ data })),
          catchError(error => of(BallActions.loadBallsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
