import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../user';

@Component({
  selector: 'app-front-side-bar',
  templateUrl: './front-side-bar.component.html',
  styleUrls: ['./front-side-bar.component.css']
})
export class FrontSideBarComponent implements OnInit {

  isLoggedIn = false;
  roles: string[] = [];
  user = this.storageService.getUser();
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


  constructor( private router: Router, private httpClient: HttpClient,
    private storageService: TokenStorageService, private toastr: ToastrService,
     private toast : NgToastService) {
      
      }


      logout(){
        this.storageService.signOut();
    
        this.router.navigateByUrl("/login");
    
      }


      public onFileChanged(event: any) {

        var reader = new FileReader();
        reader.onload =  ()  => {
          var output :any  = document.getElementById('user_image');
          output.src = reader.result;
          this.imageName = reader.result!.toString();
        }
        reader.readAsDataURL(event.target.files[0]);
    
      }


  ngOnInit(): void {

    console.log(this.user.user.userName);
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.name = user.user.userName;
      this.imageName = user.user.imageProfile;
      this.imageCertificate = user.user.certificate;
      this.mail=user.user.mailAddress;
      this.phone=user.user.userPhone;
      this.locat=user.user.location;
      
    }


  }

} 
