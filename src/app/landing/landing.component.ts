import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  roles: string[] = [];
  isLoggedIn = false;
  imageName :string ="";
  username?: string;

  constructor(private Storage: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.Storage.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.Storage.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.imageName = user.imageProfile;


  }
  }
  logout(){
    this.Storage.signOut();
    
    this.router.navigateByUrl("/login");
  
  }

}
