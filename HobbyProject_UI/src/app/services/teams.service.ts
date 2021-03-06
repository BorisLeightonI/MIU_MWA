import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  public page:number = 1;
  private url = environment.url;

  constructor(private http: HttpClient) { }


  getTeams(): Observable<Team[]>{
    console.log('url:', this.url);
    
    return this.http.get<Team[]>(this.url);
  }
  getTeamsByBlocks(offset:number, count:number): Observable<Team[]>{    
    return this.http.get<Team[]>(this.url+'?offset='+offset+'&count='+count);
  }
  getOneTeam(id:String): Observable<Team>{    
    return this.http.get<Team>(this.url+'/'+id);
  }
  addOneTeam(team:Team): Observable<Team>{
    return this.http.post<Team>(this.url, team);
  }
  editOneTeam(team:Team): Observable<Team>{
    return this.http.put<Team>(this.url+'/'+team._id, team);
  }
  deleteOneTeam(id:String): Observable<Team>{    
    return this.http.delete<Team>(this.url+'/'+id);
  }

}
