import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReclamationComponent } from './reclamation/reclamation.component';

const routes: Routes = [
    {path:"home", component: HomeComponent},
    {path:"login", component:LoginComponent},
  {path:"signUp", component:SignUpComponent},
  {path:"reclamation",component:ReclamationComponent},
  {path:"", redirectTo:"/login", pathMatch:"full"}

  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { 

  
}
 