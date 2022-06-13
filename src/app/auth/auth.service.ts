import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthData} from "./auth-data";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false

  private token: string;

  backendApi = environment.backendApi

  private authStatusListener = new Subject<boolean>();


  constructor(private http: HttpClient) {
  }

  get() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated
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
      if (this.token) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
      }
    })

  }

  logOut(){
    this.token = null;
    this.isAuthenticated = false
    this.authStatusListener.next(false)
  }


}
