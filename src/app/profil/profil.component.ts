import { Component } from '@angular/core';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  roles: string[] = [];
  isLoggedIn = false;
  user = this.Storage.getUser();
  selectedFile: File = new File([], '')
  id = this.user.user.id;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string = "";
  imageName: any = " ";
  imageCertificate: any = " ";
  name : string ="";
  phone : string ="";
  mail : string ="";
  locat : string ="";
  certif : string ="";
  newpassword :String="";
  oldpassword :String="";
  confirmpasswoed:String="";
  user1 = new User();
  username?: string;




  constructor(private Storage: TokenStorageService, private router: Router, private httpClient: HttpClient,private storageService: TokenStorageService, private toastr: ToastrService, private toast : NgToastService) { }
  public onFileChanged(event: any) {

    var reader = new FileReader();
    reader.onload =  ()  => {
      var output :any  = document.getElementById('user_image');
      output.src = reader.result;
      this.imageName = reader.result!.toString();
    }
    reader.readAsDataURL(event.target.files[0]);

  }

  public onFileChangedCertificate(event: any) {

    var reader = new FileReader();
    reader.onload =  ()  => {
      var output :any  = document.getElementById('certificate_image');
      output.src = reader.result;
      this.imageCertificate = reader.result!.toString();
    }
    reader.readAsDataURL(event.target.files[0]);

  }

  save(): void {
    const user = new User();
    user.imageProfile= this.imageName;
    user.mailAddress=this.mail;
    user.password="";
    user.userPhone=this.phone;
    user.certificate=this.imageCertificate;
    user.location=this.locat;
    user.userName=this.name;
    user.verified=true;



    console.log(user);
    this.httpClient.put(`http://localhost:8080/update/${this.id}`, user ).subscribe((resultData: any)=>{
      console.log(resultData);
      this.storageService.saveUser(resultData);
      this.toast.success({detail: "Success Message", summary: "Updated Successfuly",duration:3000});

    });




  }
  ngOnInit(): void {
    console.log(this.user.user.userName);
    this.isLoggedIn = this.Storage.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.Storage.getUser();
      this.roles = user.roles;
      this.name = user.user.userName;
      this.imageName = user.user.imageProfile;
      this.imageCertificate = user.user.certificate;
      this.mail=user.user.mailAddress;
      this.phone=user.user.userPhone;
      this.locat=user.user.location;
      
    }





  
  }


  
  changePwd(): void {
    let body = {
      "newpassword" : this.newpassword,
      "oldpassword": this.oldpassword
    }
    if(this.confirmpasswoed == this.newpassword){
      this.httpClient.put(` http://localhost:8080/changepassword/${this.id}`, body ).subscribe((resultData: any)=>{
        console.log(resultData.statusCode);
        if(resultData.statusCode == 200){
          this.toastr.success('Password changed successfully', 'Well done',{timeOut: 3000});
        }
        else if(resultData.statusCode == 400){
          this.toastr.error('Your old password is incorrect', ' ERROR',{timeOut: 3000});}

     });
  }
  else{
   // this.toastr.error('You have to write the same passwords', ' ERROR',{timeOut: 3000});
   this.toast.error({detail: "Error Message", summary: "You have to write the same passwords",duration:3000});

  }


}



  logout(){
    this.Storage.signOut();

    this.router.navigateByUrl("/login");

  }

}
