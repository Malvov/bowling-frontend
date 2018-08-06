import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Game } from './game';
import { GameService } from './game.service';

@Component({
  selector: 'game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.css'],
  providers: [GameService]
})
export class GameStartComponent implements OnInit {

  game = new Game;
  constructor(
    private _gameService: GameService,
    private _router: Router
  ) {}

  ngOnInit() {

  }

  startGame(game) {
    this._gameService.createGame(game).subscribe(
      response => {
        game = response;
        console.log(game);
        let link = ['/play-game', game.id];
        this._router.navigate(link);
      },
      error => {
        console.log("Error creating game");
        return Observable.throw(error);
      }
    )
  }

}
