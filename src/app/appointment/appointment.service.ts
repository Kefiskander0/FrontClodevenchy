import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Appointment, CreateAppointment, MonthlyScheduledAppointmentCount, Organization} from "./appointment";

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

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(this.appointmentsUrl + '/' + id);
  }

  getScheduledAppointmentsCount(): Observable<MonthlyScheduledAppointmentCount[]> {
    return this.http.get<MonthlyScheduledAppointmentCount[]>(this.appointmentsUrl + '/scheduledAppointmentsCount');
  }

  getAllAppointmentsForHelper(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.appointmentsUrl + '/helper/' + id);
  }

  getAllOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.appointmentsUrl + '/organizations');
  }

  createAppointment(createAppointment: CreateAppointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.appointmentsUrl, createAppointment);
  }

}


