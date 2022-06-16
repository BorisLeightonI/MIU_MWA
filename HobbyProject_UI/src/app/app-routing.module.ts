import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeamComponent } from './add-team/add-team.component';
import { AuthGuard } from './auth.guard';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { ShowTeamComponent } from './show-team/show-team.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'teams', component: TeamsComponent},
  {path: 'edit/:id', component: EditTeamComponent, canActivate: [AuthGuard]},
  {path: 'show/:id', component: ShowTeamComponent, canActivate: [AuthGuard]},
  {path: 'addOne', component: AddTeamComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
