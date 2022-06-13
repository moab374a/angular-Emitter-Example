import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.get();
    const authRequest = request.clone({
      headers: request.headers.set('authorization' , "Bearer " +  authToken)
    })
    return next.handle(authRequest);
  }
}
