
import { Injectable } from '@angular/core';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Invitation } from '../models/invitation.model';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';




@Injectable({
    providedIn: 'root'
  })


export class InvitationService {

    readonly API_URL ='http://localhost:8089/api/invitation';

  constructor(private http : HttpClient) { 


  }


  addinvitationToEvent(idEvent:number, idInvitation:number ) {
    return this.http.get(
      `${this.API_URL}/addinvitationToEvent/${idEvent}/${idInvitation}`
    );
  }

  updateInvit(idInvitation:number, newInvitation: Invitation) {
    return this.http.put(this.API_URL+'/update/'+idInvitation,newInvitation)
  }


  displayInvitationByID(idInvitation: number) {
    return this.http.get(`${this.API_URL}/DisplayById/${idInvitation}`);
  }

  getListInvitService(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(`${this.API_URL}/all`);
  }
  addInvitService(invitation: Invitation) {
    return this.http.post(`${this.API_URL}/add`, invitation);
  }
  deleteInvitService(idInvitation: number) {
    return this.http.delete(`${this.API_URL}/delete/${idInvitation}`);
  }


  updateInvitService(invitation: Invitation) {
    return this.http.put(`${this.API_URL}/update`, invitation);
  }

  //deleteContratService(idcontrat: number) {
    //return this.http.delete(`${baseUrl}/delete/${idcontrat}`);
 // }
  //updateContratService(Contrat: Contrat) {
  //  return this.http.put(`${baseUrl}/update`, Contrat);
  //}
  //getContratById(id: number) {
  //  return this.http.get(`${baseUrl}/display/${id}`);
  }
