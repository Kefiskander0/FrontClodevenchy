export class Reclamation {
    id: number;
    isSignal: boolean;
    isBan: boolean;
    unbanDate: Date;
    feedback: string;
    raison: string;
    isBlock: boolean;
    createdOn: Date;
    rateLevel:number;

    
    constructor() {
      this.id = 0;
      this.isSignal = false;
      this.isBan = false;
      this.unbanDate = new Date();
      this.feedback = "";
      this.raison = "";
      this.isBlock = false;
      this.createdOn = new Date();
      this.rateLevel=-1;
    }

    
  

}