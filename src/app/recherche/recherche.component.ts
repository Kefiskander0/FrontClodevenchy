import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.html']
})
export class RechercheComponent  {
  equipeList: Post[] = [];

  constructor(private postService: PostService) {}

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
  
  
  
  


}
