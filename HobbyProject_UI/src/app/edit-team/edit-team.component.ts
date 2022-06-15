import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../model/team';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  private id!: String;
  public team!:Team;
  model = {
    name: '',
    country: '',
    date: '',
    distance:''
  }

  constructor(
    private router: ActivatedRoute,
    private teamService: TeamsService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.teamService.getOneTeam(this.id).subscribe(team => this.team = team);
  }

  onSubmit(form:NgForm){
    console.log('EditForm Values', form.value);
    
  }

}
