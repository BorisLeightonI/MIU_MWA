import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeamComponent } from './add-team/add-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShowTeamComponent } from './show-team/show-team.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'teams', component: TeamsComponent},
  {path: 'edit/:id', component: EditTeamComponent},
  {path: 'show/:id', component: ShowTeamComponent},
  {path: 'addOne', component: AddTeamComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
