import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../model/team';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.css']
})
export class ShowTeamComponent implements OnInit {

  team !: Team;
  private id!: String;

  constructor(
    private teamService: TeamsService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.teamService.getOneTeam(this.id).subscribe(team => this.team = team);
  }

}
