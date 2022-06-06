import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnChanges {

  posts!:string[];

  constructor(private dataService: DataApiService) { }

  ngOnInit(): void {
    this.dataService.getAllPosts().subscribe(posts => this.posts = posts);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataService.getAllPosts().subscribe(posts => this.posts = posts);
  }

  onNewPost(){
    const post = {id: 2, "title":"Nuevo", "author":"--"};
    this.dataService.newPost(post);
  }
  updatePost(){
    const post = { "title":"Nuevo title updated"};
    this.dataService.updatePost(2,post);
  }
  deletePost(){
    this.dataService.deletePost(1);
  }

}
