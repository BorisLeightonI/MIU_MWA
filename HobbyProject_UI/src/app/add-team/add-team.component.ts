import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  saved: boolean = false;

  constructor(
    private form: FormBuilder, 
    private teamService: TeamsService) { }

  registrationForm = this.form.group({
    name:['', Validators.required, Validators.minLength(3)],
    country:['', Validators.required],
    date:['', Validators.required],
    distance:['', Validators.required],
    teamMembers: this.form.array([]),
  });
  ngOnInit(): void {
  }

  get teamName(){
    return this.registrationForm.get('name');
  }

  get teamMembers(){
    return this.registrationForm.get('teamMembers') as FormArray;
  }

  addTeamMember(){
    const member = this.form.group({
      name: ['', Validators.required],
      age: ['', Validators.required, Validators.min(8)],
      address:['', Validators.required],
      country:['', Validators.required],
      contactName:['', Validators.required],
      contactTelephone:['', Validators.required],
    });
    this.teamMembers.push(member);
  }

  onSubmit(){
    // console.log(this.registrationForm.value);
    this.teamService.addOne(this.registrationForm.value).subscribe(response => {
      if(response){
        console.log(response)
        this.registrationForm.reset();
        this.saved = true;
        setTimeout(()=>this.saved=false, 1000);
      }
    });
  }

}
