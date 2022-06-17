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
  page:number = 1;

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
    this.teamsService.getTeams().subscribe(teams => this.teams = teams);
  }
  
  teamData(team:Team){
    this.teamMembers = team.teamMembers;
  }
  nextPage(){
    this.page += 1;
    this.teamsService.getTeamsByBlocks(this.page,5).subscribe(teams => this.teams = teams)
  }
  prevPage(){
    if(this.page>=2) this.page -= 1;
    this.teamsService.getTeamsByBlocks(this.page,5).subscribe(teams => this.teams = teams)
  }

}
