import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Game } from './game';

@Injectable()
export class GameService {
  private url:string = 'http://localhost:3000/games'
  constructor (
    private _http: HttpClient,

  ) {

  }

  getGames():Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url, {headers: headers});
  }

  getGame(game_id:number):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"/"+game_id, {headers: headers});
  }

  createGame(game:Game):Observable<any> {
    let params = JSON.stringify(game);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(
      this.url, params, {headers: headers}
    );
  }

  throwBall(game_id:number, pins:number) {
    let params = JSON.stringify({game_id: game_id, pins: pins });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(
      this.url+"/"+game_id+"/"+"throw-ball"+"/"+pins, params, {headers: headers}
    )

  }


}
