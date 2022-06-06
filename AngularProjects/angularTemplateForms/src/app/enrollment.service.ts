import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  _url = '';
  constructor(private http: HttpClient) { }
  
  enroll(user:User){
    return this.http.post<any>(this._url, user);
  }
}
