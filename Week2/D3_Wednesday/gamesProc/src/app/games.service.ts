import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private url:string = 'http://localhost:3000/games';
  constructor(private http:HttpClient) { }

  public getGames():Observable<Game[]>{
    return this.http.get<Game[]>(this.url);
  }
}
