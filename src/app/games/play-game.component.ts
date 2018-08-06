import { Component, OnInit, DoCheck } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Game } from './game';
import { GameService } from './game.service';

@Component({
  selector: 'play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css'],
  providers: [GameService]
})
export class PlayGameComponent implements OnInit, DoCheck {
  game: Game;

  public pinsDown: number;
  public pinsLeft: number = 10;
  public frameTracker: number = 0;
  public frameCounter: number = 1;
  public tenthFrameTracker: number = 0;
  public isFrameOver:boolean = false;
  public gameOver:boolean = false;
  public invalid:boolean = false;
  public oneMoreFrame: boolean = false;
  public twoMoreFrames: boolean = false;


  constructor(
    private _gameService: GameService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

  }
  ngOnInit () {
    let timer = Observable.timer(0, 2000); // to keep it updated(;
    timer.subscribe(
      () => {
        this._route.params.subscribe(params => {
          let id = params.id;
          this.getGame(id);
        });
      }
    );
    this.frameTracker = 0;
    this.pinsLeft = 10;
    console.log(this.frameCounter);
  }

  getGame(id) {
    this._gameService.getGame(id).subscribe(
      response => {
        console.log(response);
        this.game = response;
      },
      error => {
        console.log(error);
      }

    )
  }

  throwBall(pins:number) {

    this.pinsLeft -= pins;

    if (this.frameCounter < 10 ) {
      if (pins == 10 && this.frameTracker == 0) {
        this.pinsLeft = 10; //to reset pins
        this.isFrameOver = true; //for the flash message
        setTimeout(() => this.isFrameOver = false, 1000);//for the flash message
        this.frameCounter += 1; //to increase frame counter

      } else if (this.frameTracker == 1) {
        console.log("frame over");
        this.frameTracker = 0;
        this.pinsLeft = 10;
        this.isFrameOver = true;
        this.frameCounter += 1;
        setTimeout(() => this.isFrameOver = false, 1000);

      } else {
        this.frameTracker += 1;
      }

    } else {
      alert(this.tenthFrameTracker + " before ifs");
      if (pins == 10 && this.tenthFrameTracker == 0) { //strike in the tenth frame
        this.pinsLeft = 10;
        alert("strike in the tenth frame");
        this.tenthFrameTracker += 1;
      } else if (this.tenthFrameTracker == 1 && this.pinsLeft == 0 ) {
          this.pinsLeft = 10
          this.tenthFrameTracker += 1
          this.oneMoreFrame = true;
          alert("spare in the tent frame");
        } else {
         this.tenthFrameTracker += 1
      }
      alert(this.tenthFrameTracker + " after")

    }

    if (this.frameCounter >= 11) {
      this.frameCounter = 10;
    }

    if (this.tenthFrameTracker >= 2) {
      this.gameOver = true;
    } else if (this.oneMoreFrame && this.tenthFrameTracker > 2) {
      this.gameOver = true;
    }

  }

  ngDoCheck() {
    console.log("do check");
    this.invalid = this.pinsDown > 10 || 0 > this.pinsDown;
  }

}
