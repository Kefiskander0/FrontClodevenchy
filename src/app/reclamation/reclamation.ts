export class Reclamation {
    id: number;
    isSignal: boolean;
    isBan: boolean;
    unbanDate: Date;
    feedBack: string;
    raison: String;
    BlockedBy: number;
    createdOn: Date;


    
    constructor() {
      this.id = 0;
      this.isSignal = false;
      this.isBan = false;
      this.unbanDate = new Date();
      this.feedBack = "";
      this.raison = "";
      this.BlockedBy = 0;
      this.createdOn = new Date();

    }

    
  

}