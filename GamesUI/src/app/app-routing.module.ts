import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { NewGameComponent } from './new-game/new-game.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path:"games",
    component: GamesComponent
  },
  {
    path:"game/:gameId",
    component: GameComponent
  },
  {path:'newGame', component: NewGameComponent},
  {path:'editGame/:gameId', component: NewGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
