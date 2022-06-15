import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularReactiveForms';

/*   registrationForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl(''),
    })
  }); */

  constructor(private formBuilder: FormBuilder){}
  registrationForm = this.formBuilder.group({
    userName: ['Boris', [Validators.required, Validators.minLength(3)]],
    password: ['123'],
    confirmPassword: [''],
    email: [''],
    address: this.formBuilder.group({
      city: [''],
      state: [''],
      postalCode: [''],
    }),
    alternateEmails: this.formBuilder.array([]),
    teamMembers: this.formBuilder.array([]),
  });

  get userName(){
    return this.registrationForm.get('userName');
  }

  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray
  }
  get teamMembers(){
    return this.registrationForm.get('teamMembers') as FormArray
  }

  addAlternateEmail(){
    this.alternateEmails.push(this.formBuilder.control(''));
  }
  addTeamMember(){
    const member = this.formBuilder.group({
      name: [''],
      age: [''],
      position: ['']
    });
    this.teamMembers.push(member);
  }
  
  
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

  onSubmit(){
    console.log(this.registrationForm.value);
    
  }
}
