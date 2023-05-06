
import { Component, OnInit, Input} from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { NgForm } from '@angular/forms';
import { Don } from '../don';
import { DonService } from '../don.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LikeComponent } from '../like/like.component';


@Component({
  selector: 'app-afficher-posts',
  templateUrl: './afficher-posts.component.html',
  styleUrls: ['./afficher-posts.component.css']
})
export class AfficherPostsComponent implements OnInit {
 
  id:number=0;

afficherDons: boolean = false;
dons: Don[] = [];
newpost = new Post ;

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
  user:null

};


constructor(private postService: PostService, private donService: DonService, private router: Router, private route: ActivatedRoute) {
  this.dons = [];
  this.posts = [];
  this.view = 'table';
  this.postSelectionnee = new Post();
 
 }

 ngOnInit(): void {

  this.id = this.route.snapshot.params['id'];
      
  this.postService.getPostsById(this.id)
    .subscribe(data => {
      
      this.newpost=data[0];
      this.nouvellepost = data[0];
      


      
    }, error => console.log(error));
    console.log("aaaaaaaaaaaaaaaaaaaaerzrzrzzezzr"+this.nouvellepost.user);
    this.getPsotById(this.id);
    
}

addPost(form: NgForm): void {

  const nouvellepost: Post= {
    id:null,
    nom: form.value.nom,
    description: form.value.description,
    datecreation: form.value.datecreation,
    dons:form.value.dons,
    user: form.value.id
  };

  this.postService.addPost(nouvellepost).subscribe(post => {
    this.posts.push(post);
    form.resetForm();
    this.afficherFormulaire = false;
    this.postSelectionnee = post;  
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
    user: this.postSelectionnee?.user
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
getPsotById(id: number): void {
  if (id !== null) {
    this.postService.getPostsById(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.postSelectionnee = null;
      
    });
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+id);
  }

}

}








