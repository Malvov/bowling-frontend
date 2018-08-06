import { Component, OnInit, DoCheck } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Game } from './game';
import { GameService } from './game.service';
import { Frame } from './frame';

@Component({
  selector: 'play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css'],
  providers: [GameService]
})
export class PlayGameComponent implements OnInit, DoCheck {

  game: Game;
  frames: Array<Frame>;

  public pinsDown: number;
  public pinsLeft: number = 10;
  public frameTracker: number = 0;
  public frameCounter: number = 1;
  public tenthFrameTracker: number = 0;
  public isFrameOver:boolean = false;
  public gameOver:boolean;
  public invalid:boolean = false;
  public spareInTheTenth: boolean = false;
  public strikeInTheTenth: boolean = false;
  public strike:boolean = false;
  public spare:boolean = false;


  constructor(
    private _gameService: GameService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

  }
  ngOnInit () {
    let timer = Observable.timer(0, 10000); // to keep it updated (;
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
  }

  getGame(id) {
    this._gameService.getGame(id).subscribe(
      response => {
        this.frames = response.frames;
        this.game = response.game;
        console.log(this.game);
        console.log(this.frames);
      },
      error => {
        console.log(error);
      }

    )
  }

  throwBall(pins:number) {


    this.pinsLeft -= pins;

    this._gameService.throwBall(this.game.id, pins).subscribe(
      response => {return true},
      error => console.log(error)
    );

    if (this.frameCounter < 10 ) {
      if (pins == 10 && this.frameTracker == 0) {
        this.pinsLeft = 10; //to reset pins
        this.isFrameOver = true; //for the flash message
        this.strike = true;
        setTimeout(() => this.strike = false, 1000);
        setTimeout(() => this.isFrameOver = false, 1000);//for the flash message
        this.frameCounter += 1; //to increase frame counter


      } else if (this.frameTracker == 1) {
        console.log("frame over");
        if (this.pinsLeft == 0) {
          this.spare = true;
          setTimeout(() => this.spare = false, 1000);
        }
        this.frameTracker = 0;
        this.pinsLeft = 10;
        this.isFrameOver = true;
        setTimeout(() => this.isFrameOver = false, 1000);
        this.frameCounter += 1;

      } else {
        this.frameTracker += 1;
      }

    } else {
      if (pins == 10 && this.tenthFrameTracker == 0) { //strike in the tenth frame
        this.pinsLeft = 10;
        this.strikeInTheTenth = this.strike= true;
        this.tenthFrameTracker += 1;
        setTimeout(() => this.strike = false, 1000);
      } else if (this.tenthFrameTracker == 1 && !(this.strikeInTheTenth) && this.pinsLeft == 0 ) { //spare in the tenth frame
          this.pinsLeft = 10;
          this.tenthFrameTracker += 1;
          this.spareInTheTenth = this.spare = true;
          setTimeout(() => this.spare = false, 1000);
      } else {
        this.tenthFrameTracker += 1;
      }

      if (this.strikeInTheTenth && this.pinsLeft == 0 && this.tenthFrameTracker == 2) {
        //if you run out of pins at the spare of the tenth frame
        this.strike= true;
        setTimeout(() => this.strike = false, 1000);
        this.pinsLeft = 10;
     }

     if (this.strikeInTheTenth || this.spareInTheTenth) {
       if (this.tenthFrameTracker == 3) {
         this.gameOver = true //game over after the third shoot if there was either a strike or a spare
       }
     } else if (this.tenthFrameTracker == 2) {
       this.gameOver = true;
     }

    }

  }

  ngDoCheck() {
    console.log("do check");
    this.invalid = this.pinsDown > 10 || 0 > this.pinsDown || this.pinsDown > this.pinsLeft;
  }

}
