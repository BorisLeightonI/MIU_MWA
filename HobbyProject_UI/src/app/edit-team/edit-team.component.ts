import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../model/team';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  saved: boolean = false;
  private id!: String;
  public team!: Team;
  private updatedTeam !: Team;

  constructor(
    private router: ActivatedRoute,
    private teamService: TeamsService,
    private route: Router) { }
togleSaved(){
  this.saved = !this.saved;
}
  
  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.teamService.getOneTeam(this.id).subscribe(team => this.team = team);
  }
  onSubmit(form: NgForm) {
    // console.log('EditForm Values', form.value);
    // console.log('teamMembers:', Array.of(form.value.teamMembers));
    form.value.teamMembers = Array.of(form.value.teamMembers);
    // console.log('EditForm Values', form.value);
    // console.log('teamMembers:', form.value.teamMembers);
    this.updatedTeam = form.value;
    console.log('teamUpdated?:', this.updatedTeam);
    
    // console.log('FormBuilder:', this.registrationForm.get('teamMembers')?.value);
    
    this.teamService.editOneTeam(this.team).subscribe({

      next(team) {
      },
      error(err) {
        console.log('Something went wrong', err);
      },
      complete() {
        
      },
    });
    this.teamService.editOneTeam(this.team).subscribe(team => {
      this.togleSaved();
      console.log('Updated response version:', team);
      setTimeout(()=>{
        this.togleSaved();
        this.route.navigate(['teams'])
      }, 1500);

    });
  }

}
