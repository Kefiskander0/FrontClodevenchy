import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { NgForm } from '@angular/forms';
import { Don } from '../don';
import { DonService } from '../don.service';
import { Router } from '@angular/router';
import { Like } from '../shared/models/like';
import { TokenStorageService } from '../shared/services/token-storage.service';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit {

  
  posts: Post[]= [];
 
 
  constructor(private postService: PostService, private donService: DonService,
     private router: Router,   private storageService: TokenStorageService) {
   
    this.posts = [];
  }

  ngOnInit(): void {
    this.postService.getPostsByUserId(this.storageService.getUser().user.id).subscribe(posts => {
      this.posts = posts;
      posts.forEach(post => {
        if (post.id != null) {
          this.postService.setIdCommand(post.id!);
          console.log('IdCommand:', this.postService.getIdCommand());
        }
      });
    });
  }
  like(postId: number | null | undefined): void {
    const userId = this.storageService.getUser().user.id;
    if (postId !== null && postId !== undefined) {
      console.log('postId:', postId);
      const index = this.posts.findIndex(p => p.id === postId);
      const nomPost = this.posts[index]?.nom ?? ''; // récupérer le nom du post
      this.postService.likePoost(postId, userId).subscribe(
        () => {
          if (this.posts[index]?.likes) {
            this.posts[index].likes.push(new Like());
            console.log('post liked:', this.posts[index]);
            window.alert('Vous avez liké le post du '+nomPost ); // Ajout de la fenêtre de confirmation avec le nom du post
          }
        },
        error => {
          console.log('error:', error); // Afficher l'erreur dans la console
        }
      )
    }
  }

  dislike(postId: number | null | undefined): void {
    const userId = this.storageService.getUser().user.id;
    if (postId !== null && postId !== undefined) {
      console.log('postId:', postId);
      const index = this.posts.findIndex(p => p.id === postId);
      const nomPost = this.posts[index]?.nom ?? ''; // récupérer le nom du post
      this.postService.dislikePoost(postId, userId).subscribe(
        () => {
          if (this.posts[index]?.likes) {
            this.posts[index].likes.pop();
            console.log('post disliked:', this.posts[index]);
            window.alert('Vous avez disliké le post du '+nomPost ); // Ajout de la fenêtre de confirmation avec le nom du post
          }
        },
        error => {
          console.log('error:', error); // Afficher l'erreur dans la console
        }
      )
    }
  }
  

  gotomain() {
    this.router.navigate(['/like']);
  }
}