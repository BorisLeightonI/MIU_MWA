import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularReactiveForms';

  registrationForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl(''),
    })
  });

  constructor(private formBuilder: FormBuilder){}
/*   registrationForm = this.formBuilder.group({
    userName: ['Boris', Validators.required],
    password: ['123'],
    confirmPassword: [''],
    address: this.formBuilder.group({
      city: [''],
      state: [''],
      postalCode: [''],
    }),
  }); */
  
  
  loadAPI(){
    console.log(this.registrationForm.get('userName'));
    this.registrationForm.setValue(
      {
        userName: 'Bruce',
        password: 'test',
        confirmPassword: 'test',
        address: {
          city: 'Santiago',
          state: 'Chile',
          postalCode: '480056'
        }
      }
    );
  }
}
