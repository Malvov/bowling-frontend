import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './games/games.component';
import { GameStartComponent } from './games/game-start.component';
import {PlayGameComponent } from './games/play-game.component';


const appRoutes: Routes = [
  { path: '', component: GameStartComponent },
  { path: 'games', component: GamesComponent },
  { path: 'start-game', component: GameStartComponent },
  { path: 'play-game/:id', component: PlayGameComponent },
  { path: '**', component: GameStartComponent}
 ];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
