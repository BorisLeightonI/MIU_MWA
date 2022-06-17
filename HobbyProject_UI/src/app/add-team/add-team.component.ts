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
  error: boolean = false;

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
  get teamCountry(){
    return this.registrationForm.get('country');
  }
  get teamDate(){
    return this.registrationForm.get('date');
  }
  get teamDist(){
    return this.registrationForm.get('distance');
  }

  get teamMembers(){
    return this.registrationForm.get('teamMembers') as FormArray;
  }

  addTeamMember($event:Event){
    $event.preventDefault();
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
  deleteTeamMember(i:number, $event:Event){
    $event.preventDefault();
    console.log('i value: ', i);
    
    this.teamMembers.removeAt(i);
  }

  onSubmit(){
    // console.log(this.registrationForm.value);
    
    this.teamService.addOneTeam(this.registrationForm.value).subscribe(
      response => {
        console.log(response)
        this.registrationForm.reset();
        this.saved = true;
        setTimeout(()=>this.saved=false, 1500);
      },
      error =>{
        console.log('AddOneTeam:',error);
        this.error = true;
        setTimeout(()=>this.error=false, 2000);        
      }
    );
  }

}
