import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/shared/service/Event.service';
import { DataTablesModule } from 'angular-datatables';
import { Evenment } from '../shared/models/event.model';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})

export class EventComponent implements OnInit {


  submitted = false;
  modifSubmitted = false;

  event!: Event[];

      public events : Evenment = {
        idevent: null,
        name: null,
        date: null,
        lieu : null,
        description : null,
      };


      eventList: any;
      evenmentForm! : FormGroup; 

  //formInput: FormInput;



  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input('modalDefault') modalDefault: any;

  constructor(
    public httpClient: HttpClient,
    public eventservice: EventService,
    //private messageService: MessageService,
    //private formBuilder: FormBuilder
  ) {}


  ngOnInit(): void {
    this.getAllEvent();
  }
 
  getAllEvent() {
    this.eventservice.getAllEvent().subscribe((response) => {
      this.eventList = response;
    
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

  
}