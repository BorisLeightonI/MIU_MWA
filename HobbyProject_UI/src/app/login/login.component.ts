import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn = false;

  loginUserData:User = {
    email: '',
    password: ''
  };

  constructor(
    private uServ: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.uServ.loginUser(this.loginUserData).subscribe(
      token => {
        console.log(token);
        this.loggedIn = true;
        setTimeout(()=>{
          localStorage.setItem('token', token);
          this.loggedIn=false
          this.router.navigate(['teams']);
        }, 1500);
      },
      err => console.log(err)
    )
  }

}
