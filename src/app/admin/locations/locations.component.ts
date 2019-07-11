import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  @Input() addClicked = false;
  @Output() cancelClick = new EventEmitter();
  locations = ['Bosnia','Serbia','Croatia','Slovenia']
  constructor() { }

  ngOnInit() {
  }

  cancel () {
    this.cancelClick.emit();
  }
}
