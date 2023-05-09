import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './menu/menu.component';
import {HomeComponent} from './home/home.component';
import {PostComponent} from './post/post.component';
import {EventComponent} from './event/event.component';
import {InvitComponent} from './invit/invit.component';
import {ReclamationComponent} from './reclamation/reclamation.component';
import {AlarmeComponent} from './alarme/alarme.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {LoginComponent} from './login/login.component';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {ResetPwdComponent} from './reset-pwd/reset-pwd.component';
import {AnalitycsComponent} from './analitycs/analitycs.component';
import {AuthComponent} from './auth/auth.component';
import {JobComponent} from './job/job.component';
import {CyptoComponent} from './cypto/cypto.component';
import {MapsComponent} from './maps/maps.component';
import {ShopComponent} from './shop/shop.component';
import {CalandrierComponent} from './calandrier/calandrier.component';
import {LandingComponent} from './landing/landing.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedComponent} from './activated/activated.component';
import {AngularFireModule} from '@angular/fire/compat'
import {environment} from 'src/environments/environment';
import {BackComponent} from './back/back.component';
import {ProfilComponent} from './profil/profil.component';
import {ResetPwdSmsComponent} from './reset-pwd-sms/reset-pwd-sms.component';
import {ToastContainerModule, ToastNoAnimationModule, ToastrModule} from 'ngx-toastr';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {NgChartsModule} from "ng2-charts";
import { UserAppointmentsComponent } from './user-appointments/user-appointments.component';
import {MatSelectModule} from "@angular/material/select";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";



import { AlarmComponent } from './alarm/alarm.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { LikeComponent } from './like/like.component';
import { AfficherPostsComponent } from './afficher-posts/afficher-posts.component';
import { DonComponent } from './don/don.component';
import { RechercheComponent } from './recherche/recherche.component';
import { LayoutComponent } from './layout/layout.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {NgToastModule} from 'ng-angular-popup';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FrontSideBarComponent } from './front-side-bar/front-side-bar.component';
import { ReactionComponent } from './reaction/reaction.component';



@NgModule({
  declarations: [
    MenuComponent,
    PostComponent,
    EventComponent,
    InvitComponent,
    AlarmeComponent,
    AppointmentComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPwdComponent,
    BackComponent,
    ActivatedComponent,
    ProfilComponent,
    ResetPwdSmsComponent,
    UserAppointmentsComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    AnalitycsComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    AnalitycsComponent,
    HomeComponent,
    JobComponent,
    CyptoComponent,
    MapsComponent,
    CheckoutComponent,
    ShopComponent,
    ReclamationComponent,
    AdminUsersComponent,
    CalandrierComponent,
    LandingComponent,
    AlarmComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    AnalitycsComponent,
    AuthComponent,
    HomeComponent,
    JobComponent,
    CyptoComponent,
    MapsComponent,
    CheckoutComponent,
    ShopComponent,
    ReclamationComponent,
    CalandrierComponent,
    LandingComponent,
    LikeComponent,
    AfficherPostsComponent,
    DonComponent,
    RechercheComponent,
    FrontSideBarComponent,
    ReactionComponent,
  ],
  imports: [
    GoogleChartsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgChartsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule
  ],
  exports:[
    MatIconModule, MatInputModule,
    BrowserAnimationsModule, MatTableModule
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
        onError: (err:any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }