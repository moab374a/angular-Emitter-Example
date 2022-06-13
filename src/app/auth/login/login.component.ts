import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

class ngForm {
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: false;

  constructor() { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    console.log(loginForm.value.email)
    console.log(loginForm.value.password)

  }
}
