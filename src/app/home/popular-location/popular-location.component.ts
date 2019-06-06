import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-location',
  templateUrl: './popular-location.component.html',
  styleUrls: ['./popular-location.component.css']
})
export class PopularLocationComponent implements OnInit {

  pictureLink= '/assets/img/download-res.jpg' ;
  pictureArray : string[]= [];

  constructor() { }

  ngOnInit() {

    for(var i=0;i<20;i++)
    this.pictureArray[i] = this.pictureLink; //currently load no sense

  }

}
