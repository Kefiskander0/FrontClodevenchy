

export class Evenment {

  idevent!: any;
  name!: any;
  date!: any;
  lieu!: any;
  description!: any;
  
  
  constructor(name : string, description: string, lieu: string ,  invitationID: string )
  {
    this.name = name;
    this.description =description ;
    this.lieu = lieu;
   
  }

}