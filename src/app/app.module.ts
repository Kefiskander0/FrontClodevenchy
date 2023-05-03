import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LayoutComponent} from './layout/layout.component';
import {AnalitycsComponent} from './analitycs/analitycs.component';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {JobComponent} from './job/job.component';
import {CyptoComponent} from './cypto/cypto.component';
import {MapsComponent} from './maps/maps.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {ShopComponent} from './shop/shop.component';
import {CalandrierComponent} from './calandrier/calandrier.component';
import {LandingComponent} from './landing/landing.component';
import {ReclamationComponent} from './reclamation/reclamation.component';
import {HttpClientModule} from '@angular/common/http'; // <-- Import the HttpClientModule
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // Add this line
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {AppointmentComponent} from "./appointment/appointment.component";
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
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
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  exports:[
    MatIconModule, MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
