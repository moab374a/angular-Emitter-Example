import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthData} from "./auth-data";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  backendApi = environment.backendApi

  constructor(private http: HttpClient) {
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password}
    return this.http.post(`${this.backendApi}user/signup`, authData).subscribe(response => {
      console.log(response)
    })

  }

}
