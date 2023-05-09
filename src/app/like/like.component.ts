import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { NgForm } from '@angular/forms';
import { Don } from '../don';
import { DonService } from '../don.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})

export class LikeComponent implements OnInit {
 
  afficherFormulaire: boolean = false;
  postSelectionnee: Post | null = null;
  afficherModifierFormulaire: boolean = false;
  
  posts: Post[]= [];
 
 
  constructor(private postService: PostService, private donService: DonService, private router: Router) {
   
    this.posts = [];
    this.postSelectionnee = new Post();
   
   }

   ngOnInit(): void {
    this.postService.getPostsByUserId(1).subscribe(posts => {
      this.posts = posts;
     
  });
  }
  deletepost(id: number): void {
    if (id !== null) {
      this.postService.deletepost(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
        this.postSelectionnee = null;
      });
    }
  }
  modifierPost(form: NgForm): void {
    const postModifiee: Post = {
      id: this.postSelectionnee?.id,
      nom: this.postSelectionnee?.nom,
      description: this.postSelectionnee?.description,
      datecreation: this.postSelectionnee?.datecreation,
      dons: this.postSelectionnee?.dons,
      user: this.postSelectionnee?.user,
      likes:[]
    };
  
    this.postService.updatePost(postModifiee).subscribe(post => {
      const index = this.posts.findIndex(p => p.id === post.id);
      this.posts[index] = post;
      this.postSelectionnee = post;
     
    });
  
    this.afficherModifierFormulaire = true;

  } 
  fermerFormulaire() {
    this.afficherModifierFormulaire = false;
  }
  annulermodifier() {
    this.afficherModifierFormulaire = false;
  
  }
 getPsotById(id: number): void {
  if (id !== null) {
    this.postService.getPostsById(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.postSelectionnee = null;
      
    });
    
  }
  //this.router.navigate(['/afficherpost', id]);

}
gotodons() {
  this.router.navigate(['/don']);
}
gotorecherche(){

  this.router.navigate(['/recherche']);


}
gotoreaction(){
  this.router.navigate(['/reaction']);
}
}