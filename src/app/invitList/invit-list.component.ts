
import { InvitationService } from '../shared/service/invitation.service';
import { Invitation } from '../shared/models/invitation.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from "ng-apexcharts";
import { Subject } from 'rxjs';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invit-list',
  templateUrl: './invit-list.component.html',
  styleUrls: ['./invit-list.component.css']
})
export class InvitListComponent implements OnInit {
  invitation: Invitation[] = [];
  static = { Accepted: 0, Refused: 0, InProgress: 0 };
  p: number = 1;

  isShowed = false;
  isNotifShowed = false;
  currentDate = new Date();
  toastBody = '';
  TypeToast = '';
  i!: Invitation
  closeResult!: string;
  public invitations!: Invitation;
  invit: Invitation = {
    idInvitation: 0,
    name: null!,
    helperInvited: null!,
    dateInvitation: null!,
    status: null!,
    archive: false,
    event: null,
  };
  editable = false;


  constructor(private invitationservice: InvitationService,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.refreshData();
  }

  delete(idInvitation: number) {
    this.invitationservice
      .deleteInvitService(idInvitation)
      .subscribe(() => this.refreshData());
    this.ngOnInit();
  }
  DoArchive_NotArchive(invitation: Invitation) {
    this.invitationservice
      .updateInvitService({ ...invitation, archive: !invitation.archive }) //modifier l'archive seulement
      .subscribe(() => this.refreshData());
  }
  ///refreshdata
  refreshData() {
    this.invitationservice.getListInvitService().subscribe((result) => {
      console.log(result);

      this.invitation = result as Invitation[];
      this.static.Accepted = result.filter(
        (r: any) => r.status === 'Accepted'
      ).length;
      this.static.Refused = result.filter(
        (r: any) => r.status === 'Refused'
      ).length;
      this.static.InProgress = result.filter(
        (r: any) => r.status === 'InProgress'
      ).length;
    });
  }

  
  
}