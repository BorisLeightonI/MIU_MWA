import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesServiceService {

  private url = 'https://picsum.photos/v2/list';

  constructor(private http: HttpClient) { }

  getImages(){
    return this.http.get(this.url);
  }
}
