import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/shared/service/Event.service';
import { Evenment } from '../shared/models/event.model';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {



  local!:string;

  event!: Evenment[];
  addevent!: Evenment;


  eventList: any;
  evenmentForm!: FormGroup;
  public length!: number;
  public page = 1;
  public pageSize=2;
  searchText: any;
  @Input('modalDefault') modalDefault: any;

  form: boolean = false;
  e!: Evenment
  listE! : Evenment[];
 
 
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
    this.local= new Date().toLocaleDateString();
  
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

  
  
  
  deleteEtudiant(event : Evenment) {
    if(confirm("Are you sure to delete ")) {
      this.eventservice.deleteEvent(event.idEvent).subscribe(
        {
          next: () => {
            let i = this.listE.indexOf(event)
            this.listE.splice(i, 1);
            this.toastr.success(' has been deleted successfully','Success');
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

  openPDF(c:Evenment){  
 
    let doc = new jsPDF();
    doc.setFontSize(10);
    doc.setFillColor(135, 124,45,0);
    doc.text("organistation de Tunis",160,30);
    doc.text("Fiche d'evenment",90,40);
    doc.text("\n\n\n\n\n\n\n\n",2,11);
    doc.text("",40,70);
  doc.text("Fait à : "+ this.local,150,140);
  doc.output('dataurlnewwindow');
  doc.save('Attestation de '+c.name + " " +'.pdf')
  this.toastr.success("Le pdf de l'Evenment : " +c.idEvent+' '+' est pret','Success');
  
  
  }
}
