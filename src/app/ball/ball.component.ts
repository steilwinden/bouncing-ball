import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss']
})
export class BallComponent implements OnInit, OnDestroy {
  private x: number = 50; // Startposition X
  private y: number = 50; // Startposition Y
  private vx: number = 5; // Geschwindigkeit X
  private vy: number = 2; // Geschwindigkeit Y
  private radius: number = 20; // Radius des Balls
  public ballRunning: boolean = false; // Zustand des Balls (gestartet oder gestoppt)
  private animationId: number = 0; // ID der Animationsanfrage
  public ballForm: FormGroup = new FormGroup({}); // FormGroup für das Formular

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.ballForm = this.formBuilder.group({
      vx: [this.vx, [Validators.required, Validators.pattern('^[1-9]+$')]],
      vy: [this.vy, [Validators.required, Validators.pattern('^[1-9]+$')]]
    });

    this.ballForm.valueChanges.subscribe(formValues => {
      if (formValues.vx < 1 || formValues.vy < 1) {
        return;
      }
      this.vx = Math.sign(this.vx) * formValues.vx;
      this.vy = Math.sign(this.vy) * formValues.vy;
      this.drawBall(); // Ball mit den neuen Werten zeichnen
    });

    this.drawBall(); // Ball initial zeichnen
  }

  drawBall() {
    const canvas = document.getElementById('ball-canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fillStyle = '#FF0000';
      context.fill();
      context.closePath();
    }
  }

  updateBallPosition() {
    const canvas = document.getElementById('ball-canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    if (context && this.ballRunning) {
      // Clear Canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Ball zeichnen
      this.drawBall();

      // Kollision mit den Rändern überprüfen
      if (this.x + this.vx > canvas.width - this.radius || this.x + this.vx < this.radius) {
        this.vx = -this.vx;
      }
      if (this.y + this.vy > canvas.height - this.radius || this.y + this.vy < this.radius) {
        this.vy = -this.vy;
      }

      // Neue Position berechnen
      this.x += this.vx;
      this.y += this.vy;

      // Animation fortsetzen
      this.animationId = requestAnimationFrame(() => this.updateBallPosition());
    }
  }

  toggleBallMovement() {
    this.ballRunning = !this.ballRunning;

    if (this.ballRunning) {
      this.updateBallPosition(); // Starte die Ballbewegung
    } else {
      cancelAnimationFrame(this.animationId); // Stoppe die Ballbewegung
    }
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId); // Stoppe die Ballbewegung beim Verlassen der Komponente
  }
}
