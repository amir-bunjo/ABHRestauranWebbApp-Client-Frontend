import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  counter=0;
  searchForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createSearchForm();
  }

  valueChanged() { // You can give any function name
    var name = this.searchForm.value.name;
    this.counter = this.counter + 1;
    this.valueChange.emit(name);
  }
  
  createSearchForm(){
    this.searchForm = new FormGroup({
      'name': new FormControl(null),
    })
  }

}
