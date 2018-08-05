import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Game } from './game';
import { GameService } from './game.service';

@Component({
  selector: 'games-list',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  providers: [GameService]
})
export class GamesComponent implements OnInit {
  games: Array<Game>;

  constructor(
    private _gameService: GameService
  ) {

  }

  ngOnInit() {
    let timer = Observable.timer(0,2000);
    timer.subscribe(
      () => this.getGames()
    );
  }

  getGames() {
    this._gameService.getGames().subscribe(
      games => {
        console.log(games);
        this.games = games;

      },
      error => console.log(<any>error)
    )
  }
}
