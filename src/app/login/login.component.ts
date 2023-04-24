import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  userName: string ="";
  password: string ="";

  constructor(private router: Router,private http: HttpClient ) { }

  loginUser(){
    console.log(this.userName);
    console.log(this.password);
    
    let bodyData = {
      userName: this.userName,
      password: this.password,
    };

    this.http.post("http://localhost:8083/authenticate", bodyData).subscribe((resultData: any)=>{
      console.log(resultData);

     
        this.router.navigateByUrl('/home');
     

    });
  }
 
}
