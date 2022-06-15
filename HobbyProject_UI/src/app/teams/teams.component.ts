import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Team } from '../model/team';
import { TeamMembers } from '../model/team-members';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams !: Team[];
  teamMembers !: TeamMembers[];

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
    this.teamsService.getTeams().subscribe(teams => this.teams = teams);
  }
  
  teamData(team:Team){
    this.teamMembers = team.teamMembers;
    
  }

}
