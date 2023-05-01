import { Component } from '@angular/core';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../shared/models/user';

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
  idUser = this.user.user.idUser;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string = "";
  imageName: any = " ";
  user1 = new User();

  constructor(private Storage: TokenStorageService, private router: Router, private httpClient: HttpClient,private storageService: TokenStorageService) { }
  public onFileChanged(event: any) {

    var reader = new FileReader();
    reader.onload =  ()  => {
      var output :any  = document.getElementById('user_image');
      output.src = reader.result;
      this.imageName = reader.result!.toString();

      //document.getElementById('update-image-container').style.display = 'flex';
      //document.getElementById('update-image-container').style.justifyContent = 'center' ;
    }
    reader.readAsDataURL(event.target.files[0]);

  }
  
  save(): void {
    const user = new User();
    user.imageProfile= this.imageName;
    user.mailAddress="";
    user.password="";
    user.userPhone="";
    user.location="";
    user.certificate="";
    user.userName="amen";
    user.verified=true;
    

    console.log(user);
    this.httpClient.put(`http://localhost:8083/update/${this.idUser}`, user ).subscribe((resultData: any)=>{
      console.log(resultData);     
      this.storageService.saveUser(resultData);
    });
 

    
  }
  ngOnInit(): void {
    console.log(this.user.user.userName);
    this.isLoggedIn = this.Storage.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.Storage.getUser();
      this.roles = user.roles;
    }
    this.imageName= this.user.user.imageProfile;

  }

}
