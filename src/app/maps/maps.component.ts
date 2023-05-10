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
    this.posts = [];
   
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
      this.postService.setIdCommand(post.id); 
      console.log('IdCommand:', this.postService.getIdCommand());
    });
    this.router.navigate(['/like']);
  }
  
  

  gotodons() {
    this.router.navigate(['/don']);


  }

}
