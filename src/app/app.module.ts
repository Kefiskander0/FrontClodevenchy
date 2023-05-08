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
import { AnalitycsComponent } from './analitycs/analitycs.component';
import { AuthComponent } from './auth/auth.component';
import { JobComponent } from './job/job.component';
import { CyptoComponent } from './cypto/cypto.component';
import { MapsComponent } from './maps/maps.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { CalandrierComponent } from './calandrier/calandrier.component';
import { LandingComponent } from './landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedComponent } from './activated/activated.component';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { BackComponent } from './back/back.component';
import { ProfilComponent } from './profil/profil.component';
import { ResetPwdSmsComponent } from './reset-pwd-sms/reset-pwd-sms.component';
import { ToastrModule,ToastContainerModule,ToastNoAnimationModule} from 'ngx-toastr';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {NgToastModule} from 'ng-angular-popup';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import {NgxPaginationModule} from 'ngx-pagination';




@NgModule({
  declarations: [
    AnalitycsComponent,
    AuthComponent,
    JobComponent,
    CyptoComponent,
    MapsComponent,
    ShopComponent,
    ReclamationComponent,
    AdminUsersComponent,
    CalandrierComponent,
    LandingComponent,
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
    BackComponent,
    LoginComponent,
    ResetPwdSmsComponent,
    ProfilComponent,
    AdminUsersComponent,



    
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    NgToastModule,
    SocialLoginModule,
    AppRoutingModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    ToastContainerModule,    
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1397775311055450')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }