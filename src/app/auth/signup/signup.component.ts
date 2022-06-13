import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signout',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading: false;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSignup(loginForm: NgForm) {
    if(loginForm.invalid) return
    this.authService.createUser(loginForm.value.email ,loginForm.value.password)
  }
}
