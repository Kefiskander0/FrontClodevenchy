
import { EventComponent } from "src/app/event/event.component";
import { Status } from "./status";

export class Invitation{

     idInvitation!:number;
	 name:any;
	 helperInvited:any
	 dateInvitation!: Date;
     status! : Status;
     archive!: boolean;
    event!:any;
}