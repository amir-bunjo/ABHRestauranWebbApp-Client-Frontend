import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pictureLink= '/assets/img/download-res.jpg' ;
  pictureArray : string[]= [];

  max: number = 10;
  rate: number = 7;
  isReadonly: boolean = true;

  constructor() { }

  ngOnInit() {

    for(var i=0;i<21;i++)
     this.pictureArray[i] = this.pictureLink;
  }

}
