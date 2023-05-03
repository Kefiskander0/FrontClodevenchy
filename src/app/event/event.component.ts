import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
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

  event!: Evenment[];



  eventList: any;
  evenmentForm!: FormGroup;

  //formInput: FormInput;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input('modalDefault') modalDefault: any;

  form: boolean = false;
  e!: Evenment
 
  closeResult!: string;
  constructor(
    public httpClient: HttpClient,
    public eventservice: EventService,
    private modalService: NgbModal
  ){}

  ngOnInit(): void {
    this.getAllEvent();
  }

  getAllEvent() {
    this.eventservice.getAllEvent().subscribe((response) => {
      this.eventList = response;
    });
  }

  open(content: any, action: any) {
    if (action != null)
      this.event = action
    else
      this.e= new Evenment();
    this.modalService.open(content, {ariaLabelledBy:'modal-title'}).result.then((result : any) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason : any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  deleteEvent(id: any,i :any) {
    console.log('id to delete', id);
    this.eventList.splice(i,1);
    this.eventservice.deleteEvent(id).subscribe((response) => {
      // Faire quelque chose après la suppression de l'événement
    });
  }
}
