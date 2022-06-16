import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private uService: UserService, private router: Router){}

  canActivate(): boolean {
    if(this.uService.logedIn()) return true;
    this.router.navigate(['login']);
    return false;
  }
  
}
