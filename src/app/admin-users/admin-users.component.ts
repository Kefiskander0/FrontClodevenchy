import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../shared/services/token-storage.service';

import { ToastrService } from 'ngx-toastr';
import { Role } from '../shared/models/role';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {

  constructor(private router: Router,private http: HttpClient,private toastr: ToastrService , private Storage: TokenStorageService ) { }
  role = new Role();
  username: string ="";
  email: string ="";
  password: string ="";
  Password: string="";
  MailAddress: string ="";
  userName: string ="";
  isoptionsDisplayed = false; 
  showOptions(){
    this.isoptionsDisplayed = !this.isoptionsDisplayed
    console.log(this.isoptionsDisplayed);
  }
   listUsers:any = [];
   p:any;

  getAllUsers(){
    this.http.get("http://localhost:8083/getAll").subscribe((resultData)=>{
    

this.listUsers = resultData;
console.log(this.listUsers);


    });
  }


    

  ngOnInit(): void {
    console.log("ameeen")
    this.getAllUsers();
    
    
  }

  save() {
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
    this.http.post("http://localhost:8083/registerNewUser", bodyData).subscribe((resultData: any)=>
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


  deleteUser(idUser : number): void {
    console.log(idUser);
    this.http.delete(`http://localhost:8083/delete/${idUser}`).subscribe((resultData)=>{
      this.toastr.success('User deleted Successfully', 'Well done',{timeOut: 3000});
      window.location.reload();

      
      
    })

  }


  logout(){
    this.Storage.signOut();
    
    this.router.navigateByUrl("/login");
  
  }

  

}
