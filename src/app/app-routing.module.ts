import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AnalitycsComponent } from './analitycs/analitycs.component';
import { AuthComponent } from './auth/auth.component';
import { JobComponent } from './job/job.component';
import { MapsComponent } from './maps/maps.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CalandrierComponent } from './calandrier/calandrier.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { LikeComponent } from './like/like.component';
import { PostComponent } from './post/post.component';
import { EventComponent } from './event/event.component';
import { InvitComponent } from './invit/invit.component';
import { DonComponent } from './don/don.component';
import { AlarmComponent } from './alarm/alarm.component';
import { AfficherPostsComponent } from './afficher-posts/afficher-posts.component';
import { RechercheComponent } from './recherche/recherche.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { ActivatedComponent } from './activated/activated.component';
import { AlarmeComponent } from './alarme/alarme.component';
import { BackComponent } from './back/back.component';
import { ProfilComponent } from './profil/profil.component';
import { ResetPwdSmsComponent } from './reset-pwd-sms/reset-pwd-sms.component';
import {AppointmentComponent} from "./appointment/appointment.component";
import {UserAppointmentsComponent} from "./user-appointments/user-appointments.component";
import { AdminUsersComponent } from './admin-users/admin-users.component';


const routes: Routes = [
  {path: '', component: HomeComponent, children: [
{path:'home',component:HomeComponent},
{path:'reclamation',component:ReclamationComponent},
{path:'appointments',component:AppointmentComponent},
{path:'like',component:LikeComponent},
{path:'poste',component:PostComponent},
{ path: 'crypto', component: AnalitycsComponent },
{ path: 'maps', component: MapsComponent },
{ path: 'calandrier', component: CalandrierComponent },
{ path: 'shop', component: CheckoutComponent },
{ path: 'checkout', component: ReclamationComponent },
{path:'home',component:HomeComponent},
{path:'like',component:LikeComponent},
{path:'crypto',component:PostComponent},
{path:'appointment',component:HomeComponent},
{path:'event',component:EventComponent},
{path:'invit',component:InvitComponent},
{path:'don',component:DonComponent},
{path:'login',component:LoginComponent},
{ path: 'alarm', component: AlarmComponent },

{ path: 'afficherpost', component: AfficherPostsComponent },
{path:'login',component:LoginComponent},
{ path: 'afficherpost/:id', component: AfficherPostsComponent },
{ path: 'recherche', component: RechercheComponent }
     
    ]
    
  },
{ path: 'ResetPwd/:mailAddress', component: ResetPwdComponent },
{ path: 'forgetPassword', component: ForgetPasswordComponent },
{ path: 'activate', component: ActivatedComponent },
{ path: 'crypto', component: AnalitycsComponent },
{ path: 'maps', component: MapsComponent },
{ path: 'calandrier', component: CalandrierComponent },
{ path: 'shop', component: CheckoutComponent },
{ path: 'checkout', component: ReclamationComponent },
{path:'alarme',component: AlarmeComponent},
{path:'back',component: BackComponent},
{ path: 'restSms/:phone', component: ResetPwdSmsComponent },
{path:'admin',component: AdminUsersComponent},
{ path: 'user-appointments', component: UserAppointmentsComponent },
{ path: 'auth', component: AuthComponent },
{ path: 'profil', component: ProfilComponent },
{ path: 'landing', component: LandingComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
