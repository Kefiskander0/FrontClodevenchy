import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Appointment} from "./appointment";

@Injectable({providedIn: 'root'})
export class AppointmentService {

  private readonly appointmentsUrl = "http://localhost:8080/appointments";

  constructor(private http: HttpClient) { }

  getAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(this.appointmentsUrl + '/' + id);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.appointmentsUrl);
  }

}


