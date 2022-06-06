import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css']
})
export class StarsRatingComponent implements OnInit {

  _rating:number = 0;
  stars: number[] = [];

  @Input() set rating(rating: number){
    this._rating = rating;
    this.stars = new Array<number>(rating);
  }
/*   ngOnChanges(changes: SimpleChanges): void {
    this.stars= new Array<number>(changes['rating'],currentValue);
    }; */
    
  constructor() { }

  ngOnInit(): void {
  }

}
