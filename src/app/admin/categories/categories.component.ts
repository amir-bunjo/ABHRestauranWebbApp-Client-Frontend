import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input() addClicked = false;
  @Output() cancelClick = new EventEmitter();

  categories = ['Vegeterian','Bosnian','Halal'];

  constructor() { }

  ngOnInit() {
  }

  cancel () {
    this.cancelClick.emit();
  }

}
