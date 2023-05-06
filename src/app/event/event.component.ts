import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/shared/service/Event.service';
import { Evenment } from '../shared/models/event.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  submitted = false;
  modifSubmitted = false;

  event!: Evenment[];
  addevent!: Evenment;


  eventList: any;
  evenmentForm!: FormGroup;

  public length!: number;
  public page = 1;
  public pageSize=2;
  searchText: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input('modalDefault') modalDefault: any;

  form: boolean = false;
  e!: Evenment
  listE! : Event[];
 
 
  closeResult!: string;
  constructor(
    public httpClient: HttpClient,
    public eventservice: EventService,
    private modalService: NgbModal,
    private toastr : ToastrService,
  ){}

  ngOnInit(): void {
    this.getAllEvent();
    this.addevent=new Evenment()
  
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

  onSearchByName() {
    if (!this.searchText) {
      this.getAllEvent();
    } else {
      this.eventservice.searchByNameEvent({page:this.page-1, size:this.pageSize}, this.searchText).subscribe(
        (data:Evenment[]) => {
          // @ts-ignore
          this.teamsList = data['content'];
        }
      )
    }

  }

  clear() {
    this.submitted = false;
    this.modifSubmitted = false;
  }

  
  deleteEvent(evenment: Evenment ) {
    if(confirm("Are you sure to delete "+evenment.name)) {
      this.eventservice.deleteEvent(evenment.idEvent).subscribe(
        {
          next: () => {
            let idEvent = this.eventList.indexOf(evenment)
            this.listE.splice(idEvent, 1);
            this.toastr.success(evenment.name+' has been deleted successfully','Success');
          }, error: (err) => {
            console.log("err" + err);
            this.toastr.error('something went wrong !','Error');
    
          }
        }
      )
     
      
    }
  }


  addEvent() {
    this.eventservice.addEvent(this.addevent).subscribe(() => {
      console.log("form",this.addevent);
      this.getAllEvent();
      this.form = false;
    });
  }
}
