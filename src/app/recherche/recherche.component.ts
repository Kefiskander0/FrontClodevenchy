import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent  {
  equipeList: Post[] = [];

  constructor(private postService: PostService,private router: Router) {}

  ngOnInit(): void {
    this.postService.chercherParNom('').subscribe(
      data => {
        this.equipeList = data;
      }
    );
  }

  chercherEquipes(event: Event): void {
    let nomEquipe = (event.target as HTMLInputElement).value;
  
    this.postService.chercherParNom(nomEquipe).subscribe(
      data => {
        this.equipeList = data;
      }
    );
  }
  
  
  
  gotoma() {
    this.router.navigate(['/like']);
  
  
  }


}