import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invitation } from '../models/invitation.model';




@Injectable({
    providedIn: 'root'
  })


export class InvitationService {

    readonly API_URL ='http://localhost:8089/api/invitation';

  constructor(private http : HttpClient) { 


  }


  getAllInvitation() {
    return this.http.get<Invitation[]>(this.API_URL+'/all')
  }


  addInvitation(invit:Invitation) {
    return this.http.post(this.API_URL +'/add',invit)
  }



}