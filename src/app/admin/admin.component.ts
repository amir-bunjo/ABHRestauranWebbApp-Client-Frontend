import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestaurantsComponent, Restaurant } from './restaurants/restaurants.component';
import { TablesComponent } from './restaurants/tables/tables.component';
import { RestaurantService } from '../services/restaurant.service';
import { HttpClient } from '@angular/common/http';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

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
  showLoadingIndicator = true;

  constructor(private cdr: ChangeDetectorRef, private _router: Router) {
    this._router.events.subscribe((routerEvent: Event)=> {
      if(routerEvent instanceof NavigationStart){
        this.showLoadingIndicator = true;
      }
      if(routerEvent instanceof NavigationEnd){
        this.showLoadingIndicator = false;
      }
    })
   }

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
    this.restaurantsComponent.addTab = "Basic Details";
    this.clickedNav = clicked;
  }

  addButton(){
    this.restaurantsComponent.buttonType = 'Add';
    this.restaurantsComponent.tablesInDB = [];
    this.add = !this.add;

  }

  addRestaurant(event) {
    this.clickedNav = event;
    this.add = true;
    
  }
}
