import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { Role } from '../shared/models/role';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';






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
  
 

  

  constructor(private router: Router,private formBuilder: FormBuilder,private http: HttpClient, private auth : AuthService,private authService: SocialAuthService,private storageService: TokenStorageService, private toastr: ToastrService  ) { }

  user:any;
  loggedIn:any;
  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }

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
    

    this.http.post("http://localhost:8080/authenticate", bodyData).subscribe((resultData: any)=>{
      if(resultData.statusCode == 230){
        this.toastr.error("Account is  not verified! ."
        , " Check your email you have the link",{timeOut: 3000});

      }
      else if(resultData.statusCode == 400){
        this.toastr.error("Mot de passe incorrect ."
        , " try again ",{timeOut: 3000});

      }
      else {
      this.toastr.success('Login successfully', 'Well done',{timeOut: 3000});
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
    console.log("save entered")
    let roles = new Set<string>();
    let bodyData = {
      "userName" : this.username,
      "mailAddress" : this.MailAddress,
      "password" : this.Password,
      "role" : this.role

    }
     
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const expression1: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/i;

    if(this.username.length == 0 || this.MailAddress.length == 0 || this.Password.length == 0){
      this.toastr.error("You have to fill this information."
      , " try again ",{timeOut: 5000});
    }else if (this.username.length<3 ){
      this.toastr.error("this field must contain more than 3 caracters"
      , " try again ",{timeOut: 5000});
    }else if (expression1.test(this.Password) ==false ){
      this.toastr.error("Password length should be 8-6 characters and contain numbers, letters and special characters!"
      , " try again ",{timeOut: 5000});
    }else if(expression.test(this.MailAddress) == false){
      this.toastr.error("Email must be like this xyz@exemple.com"
      , " try again ",{timeOut: 5000});
    }
else {
  console.log("mrigl")

  
    this.http.post("http://localhost:8080/registerNewUser", bodyData).subscribe((resultData: any)=>
    {
      console.log("amenamen");
      console.log(resultData.statusCode);    
    
  
      if(resultData.statusCode == 400){
        this.toastr.error("This username is already in use"
      , "Choose another one ",{timeOut: 5000});
      }else if(resultData.statusCode == 404){
        this.toastr.error("This email is already in use"
      , " Choose another one ",{timeOut: 5000});
      }else{
        this.toastr.success("Check ur email to activate your account"
        , "User registred successfully ",{timeOut: 5000});
      }
        
    });
      


}
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
    this.authService.authState.subscribe((result:any) => {
console.log(result.email);
this.http.get(`http://localhost:8080/findbymail/${result.email}`).subscribe((resultData: any)=>{
  console.log(resultData);
  if(resultData){
    sessionStorage.setItem('auth-user',JSON.stringify(resultData));
    this.router.navigate(['/landing']);
  }
  else{
    this.toastr.warning('User not found', 'You have to create an account',{timeOut: 3000});

  }

    });
  
    
    
  });
}
}
