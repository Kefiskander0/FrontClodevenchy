import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  mailAddress: string ="";
  isLoggedIn = false;
  phone: string="";
  isDisabled : boolean = false;
  isDisabled2: boolean = false;

  constructor(private router: Router,private http: HttpClient,private Storage: TokenStorageService,private toastr: ToastrService   ) { }

  resetPwd(){
    console.log(this.mailAddress);
    
    let bodyData = {
      mailAddress : this.mailAddress,
    };
    let data = {
      phone: this.phone,
    };

    if(this.mailAddress != ""){
    this.http.post("http://localhost:8083/checkEmail", bodyData).subscribe((resultData: any)=>{
      console.log(resultData);
      this.router.navigate(['ResetPwd',this.mailAddress ]);
     
      alert("check your email!");
     

    });
  
  }
  else if(this.phone !="") {
    this.http.post(" http://localhost:8083/checkSMS", data).subscribe((resultData: any)=>{
      console.log(resultData);
      this.toastr.success('Check ur phone', 'You recived the code',{timeOut: 3000});   
      this.router.navigate(['restSms',this.phone ]);
     
      

          

    });

  
}




}

ngOnInit(): void {
this.isLoggedIn = this.Storage.isLoggedIn();

if (this.isLoggedIn) {
  const user = this.Storage.getUser();
  this.mailAddress = user.user.mailAddress;
}

}


changeInput1(e : any) {
this.isDisabled=true;
  }
  changeInput(e : any) {
    this.isDisabled2=true;
      }


}
