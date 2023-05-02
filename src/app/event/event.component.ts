import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/service/Event.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  submitted = false;
  modifSubmitted = false;

  eventList: any;
  evenmentForm!: FormGroup;
  form: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @Input('modalDefault') modalDefault: any;
  constructor(
    public httpClient: HttpClient,
    public eventservice: EventService,

    //private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllEvent();
  }

  get f() {
    return this.evenmentForm.controls;
  }

  reset() {
    this.evenmentForm.reset();
  }
  handleClear() {
    this.evenmentForm.controls['compte'].reset();
  }
  displayData() {
    this.dtOptions = { pagingType: 'full_numbers', pageLength: 10 };
    this.eventservice.getAllEvent().subscribe(
      (response) => {
        this.eventList = response;
        //this.dtTrigger.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openMyModal(eventId: string): void {
    const element = document.getElementById(eventId);
    if (element) {
      element.classList.add('md-show');
    }
  }
  clear() {
    this.submitted = false;
    this.modifSubmitted = false;
  }

  getAllEvent() {
    this.eventservice.getAllEvent().subscribe((response) => {
      this.eventList = response;
      console.log(this.eventList);
    });
  }
}
