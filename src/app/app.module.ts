import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { DonComponent } from './don/don.component';
import { LikeComponent } from './like/like.component';
import { EventComponent } from './event/event.component';
import { InvitComponent } from './invit/invit.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { AlarmeComponent } from './alarme/alarme.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedComponent } from './activated/activated.component';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    DonComponent,
    LikeComponent,
    EventComponent,
    InvitComponent,
    ReclamationComponent,
    AlarmeComponent,
    AppointmentComponent,
    ForgetPasswordComponent,
    ResetPwdComponent,
    ForgetPasswordComponent,
    ActivatedComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
