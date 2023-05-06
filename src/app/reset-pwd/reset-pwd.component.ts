import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent {
  mailAddress: string ="";
  code: string ="";
  password: string ="";

  constructor(private router: Router,private http: HttpClient,private actRoute : ActivatedRoute  ) { }

  resetDone(){
    console.log(this.code);

    let bodyData = {
      mailAddress: this.actRoute.snapshot.paramMap.get('mailAddress'),
      code: this.code,
      password:this.password
    };

    this.http.post("http://localhost:8080/resetPassword", bodyData).subscribe((resultData: any)=>{
      console.log(resultData);

      alert("done");
      this.router.navigateByUrl("/login");


    });

  }
}
