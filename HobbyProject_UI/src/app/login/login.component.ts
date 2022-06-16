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
        localStorage.setItem('token', token);
        this.router.navigate(['teams']);
      },
      err => console.log(err)
    )
  }

}
