import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from "../shared/services/token-storage.service";
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Appointment, CreateAppointment, Organization} from "../appointment/appointment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {AppointmentService} from "../appointment/appointment.service";

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit, OnDestroy, AfterViewInit {

  appointments$?: Subscription;
  organizations$?: Subscription;

  displayedColumns = ['id', 'date', 'lieu', 'helper', 'organization', 'delete'];
  dataSource: MatTableDataSource<Appointment> = new MatTableDataSource<Appointment>([]);
  filterFrom: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('picker') picker: any;
  newAppointmentForm: FormGroup;
  organizations!: Organization[];
  minDate = this.now();
  organizationControl = new FormControl('', Validators.required);
  lieuControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  dateControl = new FormControl(this.minDate);
 
  constructor(private appointmentService: AppointmentService, private storageService: TokenStorageService) {
    this.filterFrom = new FormGroup({
      filter: new FormControl('')
    });
    this.dataSource.filterPredicate = ((data, filter) => {
      if (filter === '') {
        return true;
      }
      return data.organization.userName.toLowerCase().includes(filter);
    });
    this.newAppointmentForm = new FormGroup({
      dateControl: this.dateControl,
      lieuControl: this.lieuControl,
      organizationControl: this.organizationControl
    });
  }

  ngOnInit(): void {
    this.refreshOragnizations();
  }

  ngAfterViewInit(): void {
    this.refreshAppointmentTable();
  }

  refreshAppointmentTable() {
    this.appointments$?.unsubscribe();
    this.appointments$ = this.appointmentService
      .getAllAppointmentsForHelper(this.currentUserId)
      .subscribe((response) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
      });
  }

  refreshOragnizations() {
    this.organizations$?.unsubscribe();
    this.organizations$ = this.appointmentService
      .getAllOrganizations()
      .subscribe((response) => {
        this.organizations = response;
        console.log("orgaaaaaaaaa", this.organizations)
      });
  }

  ngOnDestroy() {
    this.appointments$?.unsubscribe();
    this.organizations$?.unsubscribe();
  }

  deleteAppointment(id: number) {
    if (confirm("Are you sure you want to delete the appointment with id: " + id)) {
      this.appointmentService.deleteAppointment(id).subscribe((response) => {
        this.refreshAppointmentTable();
      });
    }
  }

  applyFilter() {
    this.dataSource.filter = this.filterFrom.get("filter")?.value.trim().toLowerCase();
  }

  get isLoggedIn() {
    return this.storageService.isLoggedIn();
  }

  get currentUserId() {
    return this.isLoggedIn ? this.storageService.getUser().user.id : null;
  }

  now(): Date {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  }

  createAppointment() {
    if (!this.newAppointmentForm.valid) {
      alert('Invalid appointment data');
      return;
    }
    const createAppointment = {
      date: this.dateControl.value,
      lieu: this.lieuControl.value,
      helperId: this.currentUserId,
      organizationId: this.organizationControl.value
    };
    console.log("createAppointment:", createAppointment);
    this.appointmentService
      .createAppointment(createAppointment as unknown as CreateAppointment)
      .subscribe({
          next: () => {
            this.newAppointmentForm.reset();
            this.refreshAppointmentTable();
          },
          error: (error) => {
            alert("Failed to create a new appointment: " + error?.error.message);
          }
        }
      );
  }
}
