import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

class Dep {
  id!:number;
  name!:string;
}


@Component({
  selector: 'app-department-list',
  template: `
  <h3> Depeartment List</h3>
  <ul class="items">
    <li (click)="onSelect(department)" [class.selected]="isSelected(department)" *ngFor="let department of departments">
        <span class="badge bg-primary"> {{department.id}} </span> {{department.name}}
    </li>
  </ul>
  `,
  styles: [
  ]
})
export class DepartmentListComponent implements OnInit {
  
  depId!:number;

  departments = [
    {"id":1, "name": "Angular"},
    {"id":2, "name": "Node"},
    {"id":3, "name": "MongoDB"},
    {"id":4, "name": "Ruby"},
    {"id":5, "name": "Bootstrap"},
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (params:ParamMap) => {
      let id = params.get('id');
      this.depId = (id!=null)?parseInt(id):0;
    });
  }

  onSelect(department:Dep){
    this.router.navigate(['/departments', department.id]);
  }
  isSelected(department:Dep){
    return department.id === this.depId;
  }



}
