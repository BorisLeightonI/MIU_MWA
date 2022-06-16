import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private regUrl = environment.register_url;
  private loginUrl = environment.login_url;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user:User){
    return this.http.post<any>(this.regUrl, user);
  }

  loginUser(user:User) {
    return this.http.post<any>(this.loginUrl, user);
  }

  logedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
