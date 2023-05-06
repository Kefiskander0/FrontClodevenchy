
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { InvitationService } from '../shared/service/invitation.service';
import { EventService } from '../shared/service/Event.service';

@Component({
  selector: 'app-affect-event',
  templateUrl: './affect-event.component.html',
  styleUrls: ['./affect-event.component.css']
})
export class AffectEventComponent  implements OnInit {
  data: any;
  keyword: any = 'name';
  @Input() InvitId: any;
  @Output() newStudentAssigned = new EventEmitter();
  tempEvent: any;


  constructor(

    private invitationservice: InvitationService,
    private evenService: EventService
  ) {}

  ngOnInit(): void {
    this.evenService.getAllEvent().subscribe((res) => {
      this.data = res;
    });
    console.log(this.InvitId);
  }

  selectEvent(item: any) {
    // do something with selected item
    console.log(item);
    this.tempEvent = item;
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }
  affecter() {
    this.invitationservice
      .addinvitationToEvent(this.tempEvent.idEvent, this.InvitId)
      .subscribe((r) => {
        if (typeof r === 'number') {
          this.newStudentAssigned.emit(this.tempEvent);
        }
        //console.log(typeof r);
      });
  }
}