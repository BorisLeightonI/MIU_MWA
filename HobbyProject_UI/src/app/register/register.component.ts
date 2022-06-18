import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registered = false;
  errRegistered = false;

  registeredUserData:User = {
    email: '',
    password: ''
  };

  constructor(
    private uServ: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    // console.log(this.registeredUserData);
    this.uServ.registerUser(this.registeredUserData).subscribe(
      token=>{
        console.log('token',token)
        this.registered = true;
        setTimeout(()=>{
          localStorage.setItem('token', token);
          this.registered=false
          this.router.navigate(['teams']);
        }, 1500);
      },
      err=>{
        console.log(err);
        this.errRegistered = true;
        setTimeout(()=>{
          this.errRegistered=false
        }, 1500);
      }
    );
    
  }

}
