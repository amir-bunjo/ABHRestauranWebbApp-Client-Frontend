import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  clickedNav = 'Dashboard';
  searchForm: FormGroup;
  add=false;
  constructor() { }

  ngOnInit() {

    this.createSearchForm();
  }

  createSearchForm(){
    this.searchForm = new FormGroup({
      'name': new FormControl(null)
    })
  }

  setClickedNav(clicked) {
    this.add=false;
    this.clickedNav = clicked;
  }


  addRestaurant(event) {
    this.clickedNav = event;
    this.add = true;
  }
}
