import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  loginUser() {
        localStorage.setItem("User","['skander','kefi']");
        this._router.navigateByUrl("/home");
      }

}
