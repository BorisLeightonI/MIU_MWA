import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private http: HttpClient) { }

  private urlApi = 'http://localhost:3000/posts'

  getAllPosts(){
    return this.http.get<any>(this.urlApi);
  }
  newPost(post:any){
    return this.http.post<any>(this.urlApi, post).subscribe( post => {
      console.log('Successfull request', post);      
    }, error => console.log('Error:', error));
  }
  updatePost(id:number, post:any){
    return this.http.patch<any>(this.urlApi+'/'+id, post).subscribe( post => {
      console.log('Successfull Update', post);      
    }, error => console.log('Error:', error));
  }
  deletePost(id:number){
    return this.http.delete<any>(this.urlApi + '/' + id).subscribe( post => {
      console.log('Successfull Delete', post);      
    }, error => console.log('Error:', error));
  }


}
