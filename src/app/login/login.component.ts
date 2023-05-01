import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { Role } from '../shared/models/role';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  role = new Role();
  username:string="";
  Password: string="";
  MailAddress: string ="";
  userName: string ="";
  mailAddress: string ="";
  password: string ="";

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
 

  

  constructor(private router: Router,private http: HttpClient, private auth : AuthService, private authService: SocialAuthService,private storageService: TokenStorageService  ) { }

  user:any;
  loggedIn:any;
  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });
  }


  showSignUp() {
    document.getElementById('container')!.classList.add("right-panel-active");
      
  }

  showSignIn() {
    document.getElementById('container')!.classList.remove("right-panel-active");
    
  }

  
  loginUser(){
    console.log(this.userName);
    console.log(this.password);
    
    let bodyData = {
      userName: this.userName,
      password: this.password,
    };

    this.http.post("http://localhost:8083/authenticate", bodyData).subscribe((resultData: any)=>{
      this.storageService.saveToken(resultData.jwtToken);
      this.storageService.saveUser(resultData);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      console.log("login user");

      console.log(resultData);

      if(resultData.user.role.roleName=="Admin"){
         this.router.navigateByUrl("/back");
      }
     else{
      this.router.navigateByUrl("/profil");
     } 
      
     

    }, 
    (error: any )=> {
      this.errorMessage = error;
      console.error('There was an error!', error);

    }
    
    );
 
  }
  
  reloadPage(): void {
    window.location.reload();
  }




  save() {
    let roles = new Set<string>();
    let bodyData = {
      "userName" : this.username,
      "mailAddress" : this.MailAddress,
      "password" : this.Password,
      "role" : this.role
    
    }

    this.http.post("http://localhost:8083/registerNewUser", bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert("User Registered Successfully Check your email to verify your account");
      window.location.reload();
    });
      

  }
  

  changeRole(e : any) {
   
    this.role.roleName=e.target.value;
    console.log(this.role);
   
      }


  signInWithGoogle(){
    this.auth.googleSignIn();
    
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);  
    sessionStorage.setItem('token',JSON.stringify(this.user.response));
    this.router.navigate(['/landing']);
    
    
    
  }

  
 
}