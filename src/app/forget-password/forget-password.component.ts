import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  mailAddress: string ="";

  constructor(private router: Router,private http: HttpClient  ) { }

  resetPwd(){
    console.log(this.mailAddress);
    
    let bodyData = {
      mailAddress : this.mailAddress,
    };

    this.http.post("http://localhost:8083/checkEmail", bodyData).subscribe((resultData: any)=>{
      console.log(resultData);
      this.router.navigate(['ResetPwd',this.mailAddress ]);
     
      alert("check your email!");
     

    });
 

  }
}
