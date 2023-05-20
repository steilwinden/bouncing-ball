import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {BallActions} from "../store/ball.actions";
import {selectBallPosition} from "../store/ball.selectors";
import {combineLatest, Subscription} from "rxjs";
import {initialBallState} from "../store/ball.reducer";

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss']
})
export class BallComponent implements OnInit, OnDestroy {
  ballPosition!: { x: number; y: number };
  animationId = 0;
  ballForm: FormGroup = new FormGroup({}); // FormGroup für das Formular
  subscription!: Subscription;
  static RADIUS = 20;
  static CANVAS_SIZE = 400;

  constructor(private store: Store, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    combineLatest([
      this.store.pipe(select(selectBallPosition)),
    ]).subscribe(([position]) => {
      this.ballPosition = position;
      this.drawBall();
    });

    this.ballForm = this.formBuilder.group({
      vx: [initialBallState.vx, [Validators.required, Validators.pattern('^[1-9]+$')]],
      vy: [initialBallState.vy, [Validators.required, Validators.pattern('^[1-9]+$')]]
    });

    this.ballForm.valueChanges.subscribe(formValues => {
      this.store.dispatch(BallActions.setBallSpeed({vx: formValues.vx, vy: formValues.vy}));
    });
  }

  drawBall() {
    const canvas = document.getElementById('ball-canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.arc(this.ballPosition.x, this.ballPosition.y, BallComponent.RADIUS, 0, 2 * Math.PI);
      context.fillStyle = '#FF0000';
      context.fill();
      context.closePath();
    }
  }

  toggleBallMovement() {
    if (!this.animationId) {
      this.updateBallPosition();
    } else {
      cancelAnimationFrame(this.animationId); // Stoppe die Ballbewegung
      this.animationId = 0;
    }
  }

  updateBallPosition() {
    this.store.dispatch(BallActions.moveBall());
    // Animation fortsetzen
    this.animationId = requestAnimationFrame(() => this.updateBallPosition());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
