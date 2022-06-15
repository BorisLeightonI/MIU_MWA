import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private url = environment.url;

  constructor(private http: HttpClient) { }


  getTeams(): Observable<Team[]>{
    console.log('url:', this.url);
    
    return this.http.get<Team[]>(this.url);
  }
  getOneTeam(id:String): Observable<Team>{    
    return this.http.get<Team>(this.url+'/'+id);
  }
  addOne(team:Team){
    return this.http.post<Team>(this.url, team);
  }

}
