import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BallComponent} from "./ball/ball.component";

const routes: Routes = [
  { path: '', redirectTo: '/ball', pathMatch: 'full' },
  { path: 'ball', component: BallComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
