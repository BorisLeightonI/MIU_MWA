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
        console.log(token)
        localStorage.setItem('token', token);
        this.router.navigate(['all']);
      },
      err=>console.log(err)
    );
    
  }

}
