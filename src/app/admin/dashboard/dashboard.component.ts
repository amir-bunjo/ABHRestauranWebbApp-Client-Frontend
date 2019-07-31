import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() addRestaurant = new EventEmitter;
  totalRestaurants: number;
  totalUsers: number;
  totalLocations: number;

  constructor(private userService: UserService,private restaurantService: RestaurantService) { }

  ngOnInit() {

    this.restaurantService.getRestaurantsTableLength().subscribe(res => this.totalRestaurants = <number>res)
    this. getCountOfUsers();
    this.getCountOfLocations();
  }

  getCountOfUsers() {
    this.userService.getAllUsers().subscribe(res => {
      let users: any[] =<any[]> res
      this.totalUsers = users.length;
      
    })
  }

  getCountOfLocations() {
    this.restaurantService.getAllLocation().subscribe(res => {
      let locations: any[] =<any[]> res
      this.totalLocations = locations.length;
    });
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
