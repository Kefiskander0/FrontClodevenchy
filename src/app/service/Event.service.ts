import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any'
})
export class EventService {


  public url=environment.defaultUrl+'/event'
  
  constructor(private http:HttpClient) { }
 

  getAllEvent(){
    return this.http.get<Event[]>(this.url +'/all')

  }

  addClass(u:Event){
    return this.http.post(this.url+'/add',u)

  }

  }
