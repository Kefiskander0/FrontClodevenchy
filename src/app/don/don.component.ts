import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { NgForm } from '@angular/forms';
import { Don } from '../don';
import { DonService } from '../don.service';
import { Router } from '@angular/router';
import { DonType } from './enumDon';



@Component({
  selector: 'app-don',
  templateUrl: './don.component.html',
  styleUrls: ['./don.component.css']
})

 
export class DonComponent implements OnInit {
  postId: number | null = null;
  afficherModifierFormulaire: boolean = false;
  dons: Don[] = [];
 posts : Post[] = [];
 imageUrl: string | undefined;
 imageWidth: number = 100;   
 imageHeight: number = 100;
  view: 'table' | 'form' = 'table';
  afficherFormulaire: boolean = false;
  donSelectionnee: Don | null = null;
  nouvelledon: any = {
    id: 0,
    image: '',
    type: "",
    users: "",
    posts: ""
  };
  donType = DonType;
  enumObject = DonType;
  

  constructor(private donService: DonService , private postService: PostService,private router: Router) {
  }

  ngOnInit(): void {
    const userId = 2;
    this.donService.getDonsBy(userId).subscribe(dons => {
      this.dons = dons;
    });
  }

  addDon(form: NgForm): void {
    const nouvelledon: Don = {
      id: null,
      image: form.value.image,
      type: form.value.type,
      posts: form.value.post,
      users: form.value.userId
    };
  
    console.log('post id:', form.value.postId);
    console.log('user id:', form.value.userId);
  
    const userId = form.value.userId;
    const postId = form.value.postId;
  
    this.donService.addDon(nouvelledon, postId,userId).subscribe(don => {
      this.dons.push(don);
      form.resetForm();
      this.afficherFormulaire = false;
      this.donSelectionnee = don;
    });
  }
  

  deletepost(id: number): void {
    if (id !== null) {
      this.donService.deletepost(id).subscribe(() => {
        this.dons = this.dons.filter(don => don.id !== id);
        this.donSelectionnee = null;
      });
    }
  }

  annuler() {
    this.afficherFormulaire = false;
    this.view = 'table';
  }

  modifierDon(form: NgForm): void {
    const postModifiee: Don = {
      id: this.donSelectionnee?.id,
      type:this.donSelectionnee?.type,
      image:this.donSelectionnee?.image,
      posts:this.donSelectionnee?.posts,
      users: this.donSelectionnee?.users
    };
  
    this.donService.updatePost(postModifiee).subscribe(dons => {
      const index = this.dons.findIndex(p => p.id === dons.id);
      this.dons[index] = dons;
      this.donSelectionnee = dons;
      this.view = 'table';
    });
  }
  fermerFormulaire() {
    this.afficherModifierFormulaire = false;
  }
  annulermodifier() {
    this.afficherModifierFormulaire = false;
  this.view = 'table';
  }
  
 
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.nouvelledon.image=file
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = this.imageWidth;
            canvas.height = this.imageHeight;
            ctx.drawImage(img, 0, 0, this.imageWidth, this.imageHeight);
            const resizedImage = canvas.toDataURL('image/jpeg');
            this.imageUrl = resizedImage;
          }
        };
      };
    }
  }

  ajouterDonToPost(form: NgForm): void {
    const postId = this.postService.getIdCommand();
    // const nouvelledon: Don = {
    //   id: null,
    //   image: form.value.image,
    //   type: form.value.type,
    //   posts: postId ? [{ id: postId, nom: '', description: '', datecreation: null, dons:null, user: null }] : [],
    //   users: form.value.userId 
    // };
    console.log('postId:', postId);
    console.log('nouvelledon:', this.nouvelledon);
    if (postId) {
      this.donService.addDonToPost(postId, this.nouvelledon).subscribe(don => {
        this.dons.push(don);
        form.resetForm();
        this.afficherModifierFormulaire = false;
        this.donSelectionnee = don;
        this.router.navigate(['/like']);
      });
    }
  }
 
  
  
  
  
  annulerAjoutDonToPost(): void {
    this.afficherModifierFormulaire = false;
  }

  gotopost() {
    this.router.navigate(['/like']);

  }




   
  






  
  
}

