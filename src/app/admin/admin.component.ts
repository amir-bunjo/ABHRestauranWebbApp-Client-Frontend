import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestaurantsComponent, Restaurant } from './restaurants/restaurants.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild(RestaurantsComponent) restaurantsComponent;
  clickedNav = 'Dashboard';
  searchForm: FormGroup;
  add=false;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this.createSearchForm();
  }

  ngAfterViewInit() {
    //this.restaurantBasicDetails = this.basicDetails.message;
    this.cdr.detectChanges();

  }

  createSearchForm(){
    this.searchForm = new FormGroup({
      'name': new FormControl(null)
    })
  }

  setClickedNav(clicked) {
    this.restaurantsComponent.restaurantData = null;
    this.restaurantsComponent.loadRestaurantsFormData(new Restaurant());
    
   // this.restaurantsComponent.basicDetails.map.setView([45.8616156, 17.417399],16);
    let that =this;
    setTimeout(function(){
      console.log('iz tajmera')
      that.restaurantsComponent.basicDetails.map.setView([45.8616156, 17.417399],3);
      that.restaurantsComponent.loadRestaurantsFormData(new Restaurant());
    },100);
  

    this.add=false;
    this.clickedNav = clicked;
  }

  addButton(){
    this.restaurantsComponent.buttonType = 'Add';

    this.add = !this.add;

  }

  addRestaurant(event) {
    this.clickedNav = event;
    this.add = true;
  }
}
