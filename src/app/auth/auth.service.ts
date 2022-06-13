import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthData} from "./auth-data";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  backendApi = environment.backendApi

  constructor(private http: HttpClient) {
  }

  get(){
    return this.token;
  }


  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password}
    return this.http.post(`${this.backendApi}user/signup`, authData).subscribe(response => {
      console.log(response)
    })

  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password}
    return this.http.post<{ token: string }>(`${this.backendApi}user/login`, authData).subscribe(response => {
      console.log(this.token)
      this.token = response.token
    })

  }


}
