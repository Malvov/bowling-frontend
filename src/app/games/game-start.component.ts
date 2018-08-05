import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
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
  submitted:boolean = false
  constructor(
    private _gameService: GameService
  ) {}

  ngOnInit() {

  }

  startGame(game) {
    this.submitted = true;
    this._gameService.createGame(game).subscribe(
      response => {
        game = response;
        console.log(game);
        return true;
      },
      error => {
        console.log("Error creating game");
        return Observable.throw(error);
      }
    )
  }

}
