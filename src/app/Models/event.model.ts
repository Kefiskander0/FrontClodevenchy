
import { invitation } from './invitation.model';

export class Event {
  idevent!: string;
  name!: string;
  date!: Date;
  lieu!: string;
  description!: string;
  invitationID!: string;
  
  constructor(name : string, description: string, lieu: string ,  invitationID: string )
  {
    this.name = name;
    this.description =description ;
    this.lieu = lieu;
    this.invitationID = invitationID;
  }

}