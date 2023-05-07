import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  posts: Post[]= [];
  constructor(private postService: PostService) {
    this.posts = [];
   
  }
  

  ngOnInit(): void {
    this.postService.retrieveAllPost().subscribe(posts => {
      this.posts = posts;
      
    });
    
  }
 


}
