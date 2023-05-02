import { Component, OnInit } from '@angular/core';
import { Reclamation } from './reclamation';
import { ReclamationService } from './reclamation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  reclamation:any={"raison":""}
  signals: Reclamation[]=[];
  feedBacks: Reclamation[]=[];
  rates: Reclamation[]=[];

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
    this.registerform = this.formBuilder.group({
      subject : ['',[Validators.required]],
    });
    this.getAllFeedbacks()

  }

  //gettings all signals
  getAllSignals(){
    this.reclamationService.getAllReclamation(this.page,this.size, "signal").subscribe(data=>{
      this.signals=data;
    })
  }

  //gettings all feedbacks
  getAllFeedbacks(){
    this.reclamationService.getAllReclamation(this.page,this.size, "feedBack").subscribe(data=>{
      this.feedBacks=data;
      console.log("data=",data)
    })
  }


  //gettings all rates
  getAllRates(){
    this.reclamationService.getAllReclamation(this.page,this.size, "rate").subscribe(data=>{
      this.rates=data;
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
  
        this.reclamationService.createReclamation(this.updateReclamation,1,2).subscribe(
          response => {
            this.registersucceed();

          },
          error => {
            this.registerfailed();
          }
        );
  
      }
  
    }else{
  
  
      this.reclamationService.updateReclamation(this.updateReclamation).subscribe(
        response => {
          this.registersucceed();
        },
        error => {
          this.registerfailed();
        }
      );
  
    }

}


// Deleting a reclamation
deleteReclamation(id:number){
this.reclamationService.deleteReclamation(id).subscribe(
  response => {

    this.registersucceed()
  },
  error => {
   this.registerfailed()
  }
);
}



//updating reclamation (feedBack)
updateReclamation(){

  if(this.reclamationToUpdate.feedback.length!=0){
    this.reclamationToUpdate.feedback=this.filterBadWords(this.reclamationToUpdate.feedback)
    if(this.reclamationToUpdate.feedback.length!=0){

      this.reclamationService.updateReclamation(this.updateReclamation).subscribe(
        response => {
          this.registersucceed();
        },
        error => {
          this.registerfailed();
        }
      );

    }

  }else{


    this.reclamationService.updateReclamation(this.updateReclamation).subscribe(
      response => {
        this.registersucceed();
      },
      error => {
        this.registerfailed();
      }
    );

  }

  }
  
  


public registersucceed() {
// this.toaster.success("succeed !")

}

public registerfailed() {

// this.toaster.error('Failed ! ');

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
this.reclamationToCreate.raison=this.filterBadWords(this.reclamationToCreate.raison)
console.log("feeeeeeed", this.reclamationToCreate)
if(this.reclamationToCreate.raison!="" || this.reclamationToCreate.feedback!="" || this.reclamationToCreate.rateLevel!=-1){
this.reclamationService.createReclamation(this.reclamationToCreate,1,2).subscribe(data=>{
this.reclamationToCreate=new Reclamation()
console.log("receeee", this.reclamationToCreate)
this.addToast('success', 'Success', 'You have successfully navigated to this component.');
this.closePopupSignal()
this.closePopupFeedback()
})
}else{
  console.log("no passaran")
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




}
