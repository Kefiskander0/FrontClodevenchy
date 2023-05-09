import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { NgForm } from '@angular/forms';
import { Don } from '../don';
import { DonService } from '../don.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

afficherDons: boolean = false;
  dons: Don[] = [];
  view: 'table' | 'form' = 'table';
  afficherFormulaire: boolean = false;
  postSelectionnee: Post | null = null;
  afficherModifierFormulaire: boolean = false;
  
  posts: Post[]= [];
  nouvellepost: Post = {
    id: null,
    nom: '',
    description:'',
    datecreation:null,
    dons:null,
    user:null,
    likes:[],


  };
 
  constructor(private postService: PostService, private donService: DonService,
     private router: Router,  private storageService: TokenStorageService) {
    this.dons = [];
    this.posts = [];
    this.view = 'table';
    this.postSelectionnee = new Post();
   
   }

   ngOnInit(): void {
    this.postService.getPostsByUserId(1).subscribe(posts => {
      this.posts = posts;

    });
  }
  addPost(form: NgForm): void {
  
    const nouvellepost: Post= {
      id:null,
       nom: form.value.nom,
      description: form.value.description,
      datecreation: form.value.datecreation,
      dons:form.value.dons,
      likes:[],
      user: this.storageService.getUser().user.id
    };

    console.log("post: ",this.nouvellepost)
    this.postService.addPost(nouvellepost,this.storageService.getUser().user.id).subscribe(post => {
      this.posts.push(post);
      form.resetForm();
      this.afficherFormulaire = false;
      this.postSelectionnee = post;  
      this.postService.setIdCommand(post.id); 
      console.log('IdCommand:', this.postService.getIdCommand());
    });
    this.router.navigate(['/like']);
  }
  
  annuler() {
    this.afficherFormulaire = false;
    this.view = 'table';
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
      likes:[],

    };
  
    this.postService.updatePost(postModifiee).subscribe(post => {
      const index = this.posts.findIndex(p => p.id === post.id);
      this.posts[index] = post;
      this.postSelectionnee = post;
      this.view = 'table';
    });
  
    this.afficherModifierFormulaire = true;

  } 
  fermerFormulaire() {
    this.afficherModifierFormulaire = false;
  }
  annulermodifier() {
    this.afficherModifierFormulaire = false;
  this.view = 'table';
  }
  fetchDons(): void {
    const postId = 1;
    this.donService.getDonsByPostId(postId).subscribe(dons => {
      this.dons = dons;
    });
  }
  onClickDons() {
    this.getDonsByUserId();
    this.afficherDons = true;
  }
getDonsByUserId() {
   const userId=1;
    this.donService.getDonsByUserId(userId).subscribe(
      dons => this.dons = dons
    );
  }

  gotodons() {
    this.router.navigate(['/don']);


  }

}
