import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Reclamation } from './reclamation';
import { Message, ReclamationService } from './reclamation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any;



@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  

  alreadySignaled:boolean=false
  alreadyFeedbacked:boolean=false
  alreadyBlocked:boolean=false

  reclamation:any={"raison":""}
  signals: any[]=[];
  feedBacks: any[]=[];
  rates: any[]=[];
  blocks: any[]=[];

  page = 0;
  size = 10;

  reclamationToCreate:Reclamation=new Reclamation()
  reclamationToUpdate:Reclamation=new Reclamation()

  userConnected:number=0;

  registerform: FormGroup  = this.formBuilder.group({
    date : ['',[Validators.required]],
    retrait : ['',[Validators.required]],

  }); ;
  


  constructor(private reclamationService:ReclamationService,
    private formBuilder : FormBuilder,
    ) { }

  ngOnInit(): void {

    this.getAllSignals()
    this.reclamationService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
    
 

    this.registerform = this.formBuilder.group({
      subject : ['',[Validators.required]],
    });
  //  this.getAllFeedbacks()

  }

  //gettings all signals
  getAllSignals(){
    this.reclamationService.getAllReclamation(this.page,this.size, "signal").subscribe(data=>{
      console.log("data = = = ",data)

      this.signals=  data.content.filter((reclamation : any)=>reclamation.to.id ===3&&  reclamation.isSignal);
      this.blocks=  data.content.filter((reclamation : any)=> reclamation.to.id ===3&&  reclamation.isBlock);
      this.feedBacks=  data.content.filter((reclamation : any)=> reclamation.to.id ===3 &&  reclamation.feedback!=null  &&  reclamation.feedback!="");
      this.rates=  data.content.filter((reclamation : any)=> reclamation.to.id ===3 && reclamation.rateLevel);
      
    for (let index = 0; index < this.signals.length; index++) {
     
      if(this.signals[index].from.id===2 && this.signals[index].isSignal)
      {this.alreadySignaled=true}
      
    }

    for (let index = 0; index < this.feedBacks.length; index++) {
     
      if(this.feedBacks[index].from.id===2 && this.feedBacks[index].feedback!="")
      {this.alreadyFeedbacked=true}
    }


    for (let index = 0; index < this.blocks.length; index++) {
     
      if(this.blocks[index].from.id===2 )
      {this.alreadyBlocked=true}
    }


console.log("rate====", this.rates)
      if(this.rates[0]!=null){
        console.log("rate = = = ",this.rates[0].to.rateAverage)

      }
    })
  }

 


  subject:String=""
  //creating reclamation
  createReclamation(){
    console.log(this.registerform.controls['subject'].value)
    this.subject=this.registerform.controls['subject'].value

    if(this.reclamationToCreate.feedback.length!=0){
      this.reclamationToCreate.feedback=this.filterBadWords(this.reclamationToCreate.feedback)
      if(this.reclamationToCreate.feedback.length!=0){
  
        this.reclamationService.createReclamation(this.updateReclamation,1,3).subscribe(
          response => {

          },
          error => {
          }
        );
        this.getAllSignals()
      }
  
    }else{
  
  
      this.reclamationService.updateReclamation(this.updateReclamation).subscribe(
        response => {
        },
        error => {
        }
      );
  
    }

}


// Deleting a reclamation
deleteReclamation(id:number){
this.reclamationService.deleteReclamation(id).subscribe(
  response => {
    this.showToast('success', 'Votre demande a été confirmée')
    this.getAllSignals()
  },
  error => {

  }
);
this.closePopupBlockedByMeList()
}


updatefeedbacktime:boolean=false
openupdatetext(reclamation:any){
  this.reclamationToUpdate=reclamation
this.updatefeedbacktime=true
}

//updating reclamation (feedBack)
updateReclamation(reclamation:any){
  this.updatefeedbacktime=false
 if(reclamation!=null){
  this.reclamationToUpdate=reclamation
 }
console.log("relcamation: ", this.reclamationToUpdate)



  if(this.reclamationToUpdate.feedback.length!=0){
    this.reclamationToUpdate.feedback=this.filterBadWords(this.reclamationToUpdate.feedback)
    if(this.reclamationToUpdate.feedback.length!=0){

      this.reclamationService.updateReclamation(this.reclamationToUpdate).subscribe(
        response => {
          this.showToast('success', 'Votre demande a été confirmée')

          this.getAllSignals()
          
        },
        error => {

        }
      );

    }else{
      this.showToast('error', " Pouvez vous insérer des mot plus douces s'il vous plaît ?  ")

    }

  }else{

    
        this.showToast('error', " Pouvez vous rédiger quelque chose s'il vous plaît ?  ")


  }

  }
  
  



 badWords = ['badword1', 'badword2', 'badword3'];
 filterBadWords(text: string): string {
  const regex = new RegExp(this.badWords.join('|'), 'gi');
  const filteredText = text.replace(regex, '****');
  return filteredText.includes('****') ? '' : text;
}



showModal = false;
openPopupReclamation() {
  this.showModal = true;

}



closePopupReclamation() {
  this.showModal = false;
}


showModallistReclamation = false;
openPopupReclamationlist() {
  this.showModallistReclamation = true;

}



closePopupReclamationlist() {
  this.showModallistReclamation = false;
}


showSignalPopup = false;
openPopupSignal() {
  this.reclamationToCreate.isSignal=true;
  this.showModal = false;
this.showSignalPopup=true
this.closePopupReclamation()

}

openPopupBlock() {
  this.reclamationToCreate.isBlock=true;
  this.showModal = false;
this.showSignalPopup=true
this.closePopupReclamation()
}



closePopupSignal() {
  this.showSignalPopup = false;
  this.closePopupReclamation()

}

confirmSignal(){

  console.log("reclamation========= ",this.reclamationToCreate)

if(this.reclamationToCreate.raison=="" && this.reclamationToCreate.feedback=="" && this.reclamationToCreate.rateLevel==-1){

  this.showToast('error', " Pouvez vous rédiger quelque chose s'il vous plaît ?  ")

}else{
  this.reclamationToCreate.raison=this.filterBadWords(this.reclamationToCreate.raison)
  this.reclamationToCreate.feedback=this.filterBadWords(this.reclamationToCreate.feedback)
  if(this.reclamationToCreate.raison!="" || this.reclamationToCreate.feedback!="" || this.reclamationToCreate.rateLevel!=-1){
  this.reclamationService.createReclamation(this.reclamationToCreate,2,3).subscribe(data=>{
  this.reclamationToCreate=new Reclamation()
  this.closePopupSignal()
  this.closePopupFeedback()
  this.closePopupRating()
  this.getAllSignals()
  this.showToast('success', 'Votre demande a été confirmée')
  })
  }else{
    this.showToast('error', " Pouvez vous insérer des mot plus douces s'il vous plaît ?  ")
  
  }


}



}


showFeedBackModal=false
openPopupFeedback() {
  this.showFeedBackModal = true;
  this.closePopupReclamation()

}



closePopupFeedback() {
  this.showFeedBackModal = false;
}


onSubmit(){
  
}


selectAction(what:any){

}


//toaster
toasts: any[] = [];
addToast(type: string, title: string, message: string) {
  this.toasts.push({ type, title, message });
  console.log("helo")
}

removeToast(toast: any) {
  this.toasts = this.toasts.filter(t => t !== toast);
}


//RATING

currentRate = 6;
isPopupVisible = false;
rating: number = 0;
icons: number[] = [1, 2, 3, 4, 5];

rate(value: number) {
  this.reclamationToCreate=new Reclamation();
  this.reclamationToCreate.rateLevel = value;
  this.rates.push(this.reclamationToCreate)

}


showRatingModal=false
openPopupRating() {
  this.isPopupVisible=true
  this.showRatingModal = true;
  this.closePopupReclamation()

}



closePopupRating() {
  this.showRatingModal = false;
}


//list

//signals
showSignalPopuplist = false;
openPopupSignallist() {
this.showSignalPopuplist=true
this.closePopupReclamationlist()

}

closePopupSignalList() {
  this.showSignalPopuplist = false;
}


//blocks list

showBlockPopuplist = false;
openPopupBlockslist() {
this.showBlockPopuplist=true
this.closePopupReclamationlist()

}

closePopupBlocksList() {
  this.showBlockPopuplist = false;
}



//blocked by me list

showBlockedbyme = false;
openPopupBlockedbyme() {
this.showBlockedbyme=true
this.closePopupBlocksList()

}

closePopupBlockedByMeList() {
  this.showBlockedbyme = false;
}




//feedback list

showFeedbackPopuplist = false;
openPopupFeedbackslist() {
this.showFeedbackPopuplist=true
this.closePopupReclamationlist()

}

closePopupFeedbacksList() {
  this.showFeedbackPopuplist = false;
}



//ratelist

showRatePopuplist = false;
openPopupRatelist() {
this.showRatePopuplist=true
this.closePopupReclamationlist()

}

closePopupRateList() {
  this.showRatePopuplist = false;
}



//chatbot


messages: Message[] = [];
  value: string="";
 
  sendMessage() {
    this.reclamationService.getBotAnswer(this.value);
    this.value = '';
  }

  showModalchatbot = false;
  openPopupchatbot() {
    this.showModalchatbot = true;
  }

  closePopupchatbot() {
    this.showModalchatbot = false;
  }



messageToasted=""
toastheader=""
  showToast(toastType: string, message: string) {
    this.messageToasted=message
    let toastElement :any = document.querySelector('.toast');
    if (toastElement) {
      // Get the toast element and set its classes and header text based on the type of toast
      if (toastType === 'success') {
        this.toastheader="Succès!"
        toastElement.classList.remove('toast-error');
        toastElement.classList.add('toast-success');
        toastElement.querySelector('.toast-header strong').textContent = 'Success!';
      } else if (toastType === 'error') {
        this.toastheader="Erreur!"

        toastElement.classList.remove('toast-success');
        toastElement.classList.add('toast-error');
        toastElement.querySelector('.toast-header strong').textContent = 'Error!';
      }
      
      // Show the toast and hide it after 2 seconds
      let toast = new bootstrap.Toast(toastElement);
      toast.show();
      setTimeout(() => {
        toast.hide();
      }, 2000);
    }
    
  }

 
  

  
  
}
