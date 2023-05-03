import { Component, OnInit } from '@angular/core';
import { Invitation } from '../shared/models/invitation.model';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { InvitationService } from 'src/app/shared/service/invitation.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-invit',
  templateUrl: './invit.component.html',
  styleUrls: ['./invit.component.css']
})



export class InvitComponent implements OnInit{
  invitation! : Invitation;
  listInv! : Invitation[];

  public length!: number;
  public page = 1;
  public pageSize=15;
  searchText: any;
  date!:Date;
  local!:string;


  constructor( 
    private invitService:InvitationService, 
     public httpClient: HttpClient,) { }


  ngOnInit(): void {
    this.getAllInvitation();
    
    
}

getAllInvitation() {
  this.invitService.getAllInvitation().subscribe((response) => {
    this.listInv = response;
  });
}

}