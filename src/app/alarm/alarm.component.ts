import { Component, OnInit } from '@angular/core';
import { AlarmServiceService } from './alarm-service.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  appointment:any={"helperId":1,"alarmActivated":false, "date":new Date()}

  constructor(private alarmService: AlarmServiceService) { }

  ngOnInit(): void {

  }
  switchValue: boolean = false;


  alarmShow(){

    this.showalarmmodal=true
  }


  showalarmmodal:boolean=false

  activateAlarm(){
    console.log("appointment", this.appointment)

    this.appointment.alarmActivated=true
    this.switchValue=true
this.showalarmmodal=false
this.alarmService.createAppointment(this.appointment).subscribe(a=>{
  console.log("appointment", this.appointment)
})
  }

  dontactivateAlarm(){
    this.appointment.alarmActivated=false
    this.switchValue=false
    this.showalarmmodal=false

  }



}
