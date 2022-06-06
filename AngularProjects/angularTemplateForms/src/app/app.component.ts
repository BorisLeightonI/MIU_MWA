import { Component } from '@angular/core';
import { EnrollmentService } from './enrollment.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularForms';
  topics = ['Angular', 'React', 'Vue'];

  userModel = new User('Rob', 'rob@test.com', 123456789, '', 'morning', true);

  constructor(private enrollmentService: EnrollmentService){ }

  onSubmit(){
    console.log(this.userModel);
    this.enrollmentService.enroll(this.userModel)
      .subscribe(
        data => console.log('Success', data),
        error => console.log('Error', error)  
      )
/* old style callbacks, now use Observables */
  }
}