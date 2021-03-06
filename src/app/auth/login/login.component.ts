import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

class ngForm {
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
   if(loginForm.invalid)return
    this.isLoading = true
    this.authService.login(loginForm.value.email , loginForm.value.password)
  }
}
