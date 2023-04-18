import { Component, OnInit } from '@angular/core';
import { Reclamation } from './reclamation';
import { ReclamationService } from './reclamation.service';
//import { ToastrService } from 'ngx-toastr';
import { tap,catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

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
   // private toaster: ToastrService
    ) { }

  ngOnInit(): void {
    this.registerform = this.formBuilder.group({
      subject : ['',[Validators.required]],
    });
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

    if(this.reclamationToCreate.feedBack.length!=0){
      this.reclamationToCreate.feedBack=this.filterBadWords(this.reclamationToCreate.feedBack)
      if(this.reclamationToCreate.feedBack.length!=0){
  
        this.reclamationService.createReclamation(this.updateReclamation,1).subscribe(
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

  if(this.reclamationToUpdate.feedBack.length!=0){
    this.reclamationToUpdate.feedBack=this.filterBadWords(this.reclamationToUpdate.feedBack)
    if(this.reclamationToUpdate.feedBack.length!=0){

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

 // this.toaster.success('Succeed ! ');

}

public registerfailed() {

//this.toaster.error('Failed ! ');

}

 badWords = ['badword1', 'badword2', 'badword3'];
 filterBadWords(text: string): string {
  const regex = new RegExp(this.badWords.join('|'), 'gi');
  const filteredText = text.replace(regex, '****');
  return filteredText.includes('****') ? '' : text;
}

  }

 




