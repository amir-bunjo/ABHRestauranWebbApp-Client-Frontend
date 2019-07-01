import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  max: number = 5;
  @Input() rate: number=0;
  isReadonly: boolean = true;


  constructor() { }

  ngOnInit() {
  }

}
