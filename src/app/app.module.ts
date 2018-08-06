import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GamesComponent } from './games/games.component';
import { GameStartComponent } from './games/game-start.component';
import {PlayGameComponent } from './games/play-game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GamesComponent,
    GameStartComponent,
    PlayGameComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
