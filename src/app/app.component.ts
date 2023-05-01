import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import{filter} from 'rxjs'
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { TokenStorageService } from './shared/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeader : boolean = false
  title = 'valzonvelzonfront';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  constructor(private router:Router,private authService: SocialAuthService,private storageService: TokenStorageService) { }
  ngOnInit(){
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event.url === '/') {
        this.showHeader =true
      }else{
        this.showHeader = false
      }
    });
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
