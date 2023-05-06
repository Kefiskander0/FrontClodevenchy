import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { AnalitycsComponent } from './analitycs/analitycs.component';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { JobComponent } from './job/job.component';
import { CyptoComponent } from './cypto/cypto.component';
import { MapsComponent } from './maps/maps.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { CalandrierComponent } from './calandrier/calandrier.component';
import { LandingComponent } from './landing/landing.component';
import {HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { ModalBasicComponent } from './shared/modal-basic/modal-basic.component';
import {ModalAnimationComponent} from './shared/modal-animation/modal-animation.component';
import { FormsModule } from '@angular/forms';
import { InvitComponent } from './invit/invit.component';
import { ToastrModule } from "ngx-toastr";
import { InvitationformComponent } from './invitationform/invitationform.component';
import { InvitdefiComponent } from './invitdefi/invitdefi.component';
import { AffectEventComponent } from './affect-event/affect-event.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from "ng-apexcharts";
import { InvitListComponent } from './invitList/invit-list.component';




@NgModule({
  declarations: [
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
    ModalBasicComponent,
    ModalAnimationComponent,
    CalandrierComponent,
    LandingComponent,
    EventComponent,
    InvitComponent,
    InvitationformComponent,
    InvitdefiComponent,
    AffectEventComponent,
    InvitListComponent,
   
    
  
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    NgbModalModule,
    NgbModule,
    FormsModule,
    NgApexchartsModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
    AutocompleteLibModule,
    NgxPaginationModule,
    NgApexchartsModule

    

    
  ],




  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
