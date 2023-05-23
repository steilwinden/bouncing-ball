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
import {ReactiveFormsModule} from '@angular/forms';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    BallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({router: routerReducer}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode(), actionsBlocklist: ['[Ball] move ball']}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(fromBall.ballFeatureKey, fromBall.reducer),
    EffectsModule.forFeature([BallEffects]),
    ReactiveFormsModule,
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
