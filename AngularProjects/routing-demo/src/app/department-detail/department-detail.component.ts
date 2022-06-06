import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-department-detail',
  template: `
  <h3>You selected department with id:  {{depId}} </h3>
  <a (click)="goPrev()">Previous</a>
  <a (click)="goNext()">next</a>

  <button (click)="gotoDepartments()"></button>
  `,
  styles: [
  ]
})
export class DepartmentDetailComponent implements OnInit {

  public depId!:number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
/*     let id = parseInt(this.route.snapshot.params['id']);
    this.depId = id; */
    this.route.paramMap.subscribe( (params:ParamMap) => {
      let id = params.get('id');
      this.depId = (id!=null)?parseInt(id):0;
    });
  }
  goPrev(){
    let previousId = this.depId - 1;
    this.router.navigate(['/departments', previousId]);
  }
  goNext(){
    let nextId = this.depId + 1;
    this.router.navigate(['/departments', nextId]);
  }
  gotoDepartments(){
    let selId = this.depId;
    this.router.navigate(['/departments', {id: selId}]);
  }

}
