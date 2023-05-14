import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BallComponent} from './ball/ball.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import * as fromBall from './store/ball.reducer';
import {BallEffects} from './store/ball.effects';

@NgModule({
  declarations: [
    AppComponent,
    BallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(fromBall.ballFeatureKey, fromBall.reducer),
    EffectsModule.forFeature([BallEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
