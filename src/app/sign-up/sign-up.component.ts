import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  userName: string ="";
  mailAddress: string ="";
  password: string ="";

  constructor(private http: HttpClient ) { }

 

  save() {
    let bodyData = {
      "userName" : this.userName,
      "mailAddress" : this.mailAddress,
      "password" : this.password
    }

    this.http.post("http://localhost:8083/registerNewUser", bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert("User Registered Successfully");
    });
      

  }
}
