import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShowTeamComponent } from './show-team/show-team.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeamsComponent,
    EditTeamComponent,
    AddTeamComponent,
    NotFoundComponent,
    ShowTeamComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
