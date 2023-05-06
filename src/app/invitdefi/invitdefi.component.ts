
import { Invitation } from '../shared/models/invitation.model';
import { InvitationService } from '../shared/service/invitation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invitdefi',
  templateUrl: './invitdefi.component.html',
  styleUrls: ['./invitdefi.component.css']
})
export class InvitdefiComponent implements OnInit {
  invitation!: Invitation;

  isShowed = false;
  isNotifShowed = false
  currentDate = new Date();
  toastBody = '';
  TypeToast = '';
  constructor(
    private route: ActivatedRoute,
    private invitationservice: InvitationService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.invitationservice
        .displayInvitationByID(+param['id'])
        .subscribe((r: any) => {
          this.invitation = r as Invitation;
          let dateFin: Date = new Date(r.dateFinContrat);
          console.log(dateFin);

          let difference = dateFin.getTime() - this.currentDate.getTime();
          let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
          console.log(TotalDays);
          if (TotalDays < 0) {
            this.TypeToast = 'danger'
            this.toastBody = `le contract a expirer`;
            this.isNotifShowed = true;
          } else
            if (TotalDays < 3) {
              this.TypeToast = 'warning'
              this.toastBody = `le contract va expirer dans ${TotalDays} jours ! `;
              this.isNotifShowed = true;
              //this.isNotifShowed = false;
            }
        });
    });

  }
  onShow() {
    this.isShowed = !this.isShowed;
  }

  enAffect(event: any) {
    this.invitation = { ...this.invitation, event };
    this.onShow();
  }
}