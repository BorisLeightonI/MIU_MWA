import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler){
    let uService = this.injector.get(UserService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${uService.getToken()}`,
        'X-Content-Type-Options': 'nosniff',
      }
    });
    return next.handle(tokenizedReq);
  }
}
