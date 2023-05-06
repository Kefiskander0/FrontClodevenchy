
import { InvitationService } from '../shared/service/invitation.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";
import { of } from 'rxjs';
import { Invitation } from '../shared/models/invitation.model';

@Component({
  selector: 'app-invitationform',
  templateUrl: './invitationform.component.html',
  styleUrls: ['./invitationform.component.css']
})
export class InvitationformComponent implements OnInit {
  editable = false;

  invitation: Invitation = {
    idInvitation: 0,
    helperInvited: null!,
    dateInvitation: null!,
    status: null!,
    archive: false,
    event: null,
  };


idInvitation!: number;
  invitationForm!: NgForm;
  currentDate = Date.now();

  constructor(
    private invitservice: InvitationService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((param) => {
      if (param['id'] !== undefined) {
        this.editable = true;
        this.invitservice
          .displayInvitationByID(+param['id'])
          .subscribe((result) => {
            console.log(result);

            this.invitation = result as Invitation;
          });
      }
    });
  }
    onSubmit() {
      if (!this.editable) {
        this.invitservice
          .addInvitService(this.invitation)
          .subscribe(() => this.router.navigate(['/listinvit']));
      } else {
        this.invitservice
          .updateInvitService(this.invitation)
          .subscribe(() => this.router.navigate(['/listinvit']));
      }
    }

compare(_v1: any, _v2: any) {
  return new Date(_v1) > new Date(_v2);
}
}

