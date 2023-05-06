import { Component, OnInit } from '@angular/core';
import { Don } from '../don';
import { NgForm } from '@angular/forms';
import { DonService } from '../don.service';

@Component({
  selector: 'app-analitycs',
  templateUrl: './analitycs.component.html',
  styleUrls: ['./analitycs.component.css']
})
export class AnalitycsComponent implements OnInit {
  afficherModifierFormulaire: boolean = false;
  dons: Don[] = [];
  
  view: 'table' | 'form' = 'table';
  afficherFormulaire: boolean = false;
  donSelectionnee: Don | null = null;
  nouvelledon: Don = {
    id: null,
    image: '',
    type: null,
    users: null,
    posts: null
  };

  constructor(private donService: DonService) {}

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
      posts: form.value.postId,
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
}
