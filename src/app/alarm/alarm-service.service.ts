import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmServiceService {

  constructor(private httpClient:HttpClient) { }

  private baseUrl = 'http://localhost:8080/appointments';

  createAppointment(appointment:any): Observable<object> {
    return this.httpClient.post(this.baseUrl,appointment);
  }


}
