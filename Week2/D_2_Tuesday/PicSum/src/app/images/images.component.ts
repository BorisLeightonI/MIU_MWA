import { Component, OnInit } from '@angular/core';
import { ImagesServiceService } from '../images-service.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  public images:any = [];

  constructor(private _imageService: ImagesServiceService) { }

  ngOnInit(): void {
    this._imageService.getImages().subscribe(data => this.images = data);
  }

}
