import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  max: number = 5;
  rate: number = 2;
  isReadonly: boolean = true;


  constructor() { }

  ngOnInit() {
  }

}
