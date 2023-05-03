import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {Appointment} from "./appointment";
import {Observable, Subscription} from "rxjs";
import {AppointmentService} from "./appointment.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit, OnDestroy {
  appointments$?: Subscription;
  appointments?: Appointment[];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointments$ = this.appointmentService
      .getAllAppointments()
      .subscribe((response) => {
        this.appointments = response;
      });
  }

  ngOnDestroy() {
    this.appointments$?.unsubscribe();
  }


}
