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

  onSubmit(event: Event): void {
    event.preventDefault();
    // ...
  }

  eventList: any;
  evenmentForm!: FormGroup;
  form: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @Input('modalDefault') modalDefault: any;
  constructor(
    public httpClient: HttpClient,
    public eventservice: EventService,

    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.displayData();
    this.evenmentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      date: [''],
      lieu: ['', [Validators.required]],
      description: [''],
    });
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
    this.eventservice.GetAllEvenment().subscribe(
      (response) => {
        this.eventList = response;
        //this.dtTrigger.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openMyModal() {
    document.querySelector('#' + event)?.classList.add('md-show');
  }

  clear() {
    this.submitted = false;
    this.modifSubmitted = false;
  }
 

  GetAllEvenment() {
    this.eventservice.GetAllEvenment().subscribe((response) => {
      this.eventList = response;
    });
  }
}
