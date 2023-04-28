import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  userName: string ="";
  mailAddress: string ="";
  password: string ="";

  constructor(private router: Router,private http: HttpClient, private auth : AuthService ) { }

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
      console.log(resultData);

     
      this.router.navigateByUrl("/home");
     

    });
 
  }





  save() {
    let bodyData = {
      "userName" : this.userName,
      "mailAddress" : this.mailAddress,
      "password" : this.password
    }

    this.http.post("http://localhost:8083/registerNewUser", bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert("User Registered Successfully Check your email to verify your account");
      
    });
      

  }


  signInWithGoogle(){
    this.auth.googleSignIn();
    
  }

  
 
}