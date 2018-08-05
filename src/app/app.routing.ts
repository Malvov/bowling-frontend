import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './games/games.component';
import { GameStartComponent } from './games/game-start.component';


const appRoutes: Routes = [
  { path: 'games', component: GamesComponent },
  { path: 'start-game', component: GameStartComponent }
 ];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
