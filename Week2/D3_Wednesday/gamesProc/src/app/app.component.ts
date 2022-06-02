import { Component } from '@angular/core';
import { GamesService } from './games.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gamesProc';
  games:Game[] = [];

  constructor(private gameService:GamesService){}

  getGames(){
    this.gameService.getGames().subscribe(games => this.games = games);
  }
}

export interface Game {
  _id: string,
  title: string,
  year: number,
  rate: number,
  price: number,
  minPlayers: number,
  maxPlayers: number,
  publisher: {
    _id: string,
    name: string
  },
  reviews: [ string ],
  minAge: number,
  designers: [number]
}
