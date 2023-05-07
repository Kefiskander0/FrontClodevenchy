import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Appointment} from "./appointment";
import {Subscription} from "rxjs";
import {AppointmentService} from "./appointment.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {ChartData, ChartOptions} from "chart.js";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit, OnDestroy, AfterViewInit {
  appointments$?: Subscription;
  monthlyScheduledAppointments$?: Subscription;

  displayedColumns = ['id', 'date', 'lieu', 'helper', 'organization', 'delete'];
  dataSource: MatTableDataSource<Appointment> = new MatTableDataSource<Appointment>([]);
  filterFrom: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading: boolean = true;

  monthlyScheduledAppointments?: ChartData<'line'>;
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Scheduled Appointments',
      },
    },
  };

  constructor(private appointmentService: AppointmentService) {
    this.filterFrom = new FormGroup({
      filter: new FormControl('')
    });
    this.dataSource.filterPredicate = ((data, filter) => {
      if (filter === '') {
        return true;
      }
      const helperMatches = data.helper.userName.toLowerCase().includes(filter);
      const organizationMatches = data.organization.userName.toLowerCase().includes(filter);
      return helperMatches || organizationMatches;
    });
  }

  ngOnInit(): void {
    this.refreshAppointmentGraph();
  }

  ngAfterViewInit(): void {
    this.refreshAppointmentTable();
  }

  refreshAppointmentTable() {
    this.appointments$?.unsubscribe();
    this.appointments$ = this.appointmentService
      .getAllAppointments()
      .subscribe((response) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
      });
  }

  refreshAppointmentGraph() {
    this.monthlyScheduledAppointments$?.unsubscribe();
    this.monthlyScheduledAppointments$ = this.appointmentService
      .getScheduledAppointmentsCount()
      .subscribe((response) => {
        this.monthlyScheduledAppointments = {
          labels: response.map(value => value.year + '-' + value.month),
          datasets: [
            { label: 'Appointments', data: response.map(value => value.count) },
          ],
        };
      });
  }

  ngOnDestroy() {
    this.appointments$?.unsubscribe();
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


}
