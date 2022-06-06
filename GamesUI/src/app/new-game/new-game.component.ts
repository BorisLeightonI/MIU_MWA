import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  private game!:Game;
  constructor(
    private frm: FormBuilder, 
    private route: ActivatedRoute,
    private gameService: GamesDataService
    ) { this.game = new Game('','',0)}

  gameForm = this.frm.group({
    title: ['titulo de inicio'],
    year: [0],
    rate: [''],
    price: [''],
    minPlayers: [''],
    maxPlayers: [''],
    minAge: ['']
  });

  ngOnInit(): void {
    const gameId = this.route.snapshot.params['gameId'];
    this.gameService.getGame(gameId).subscribe(game => {
      this.game = game
      this.gameForm.patchValue(
        {
          title: game.title,
          year: game.year,
          rate: game.rate,
          price: '',
          minPlayers: '',
          maxPlayers: '',
          minAge: ''
        }
      );
    });
    console.log(this.game);
    

  }

}
