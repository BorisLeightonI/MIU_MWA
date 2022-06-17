import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../model/team';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.css']
})
export class ShowTeamComponent implements OnInit {
  deleted = false;
  displayStyle = "none";
  team !: Team;
  private id!: String;

  constructor(
    private teamService: TeamsService,
    private router: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.teamService.getOneTeam(this.id).subscribe(team => this.team = team);
  }
  
  deleteTeam(){
    this.teamService.deleteOneTeam(this.id).subscribe(team => {
      this.team = team
      this.deleted = true;
      setTimeout(()=>{
        this.deleted=false
        this.route.navigate(['teams']);
      }, 1500);
    });
  }


}
