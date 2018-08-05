import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Game } from './game';

@Injectable()
export class GameService {
  private url:string = 'https://bowling-app-api-by-malvov.herokuapp.com/games'
  constructor (
    private _http: HttpClient,

  ) {

  }

  getGames():Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url, {headers: headers});
  }


}
