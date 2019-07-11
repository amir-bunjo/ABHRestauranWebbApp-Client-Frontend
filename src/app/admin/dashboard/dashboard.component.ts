import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() addRestaurant = new EventEmitter;
  totalRestaurants: number;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {

    this.restaurantService.getRestaurantsTableLength().subscribe(res => this.totalRestaurants = <number>res)
  }


  addNewRestaurant() {
    this.addRestaurant.emit('Restaurants');
  }

  addNewLocation() {
    this.addRestaurant.emit('Locations');
  }

  addNewUser() {
    this.addRestaurant.emit('Users');
  }



}
