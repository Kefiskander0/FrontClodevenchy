import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import{filter} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
showHeader : boolean = false
  title = 'valzonvelzonfront';
  constructor(private router:Router){
    
  }

  ngOnInit(){
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event.url === '/') {
        this.showHeader =true
      }else{
        this.showHeader = false
      }
    });
  }
}
