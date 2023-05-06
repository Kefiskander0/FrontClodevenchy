import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './menu/menu.component';
import {HomeComponent} from './home/home.component';
import {PostComponent} from './post/post.component';
import {DonComponent} from './don/don.component';
import {LikeComponent} from './like/like.component';
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
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {NgChartsModule} from "ng2-charts";
import { UserAppointmentsComponent } from './user-appointments/user-appointments.component';
import {MatSelectModule} from "@angular/material/select";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";



@NgModule({
  declarations: [
    AnalitycsComponent,
    AuthComponent,
    JobComponent,
    CyptoComponent,
    MapsComponent,
    ShopComponent,
    ReclamationComponent,
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
    UserAppointmentsComponent,




  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
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
    provideFirestore(() => getFirestore())
  ],
  exports:[
    MatIconModule, MatInputModule, MatTableModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
