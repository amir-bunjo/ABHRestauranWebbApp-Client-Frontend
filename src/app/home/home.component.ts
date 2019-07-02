import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pictureLink = '/assets/img/restaurants.png';
  imageLinks: string[] = [];

  max: number = 10;
  rate: number = 7;
  isReadonly: boolean = true;
  restaurantsFromDB: any;


  constructor(private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit() {
    // timer(0,1000).subscribe(res => console.log(res));

    for (var i = 0; i < 21; i++)
      this.imageLinks[i] = this.pictureLink;
    this.loadRestaurantsData(0);
  }

  loadRestaurantsData(startIndex: number) {

    this.restaurantService.getRestaurantsWithStartIndex(startIndex).subscribe(data => {
      console.log(data);
      this.restaurantsFromDB = data;
      //this.loadRestaurantsOnpage();
      //this.loadNumberOfPages();  
    });
  }

  searchMatchedRestaurant(name) {
    var cousines = [];
    this.restaurantService.getMatchedRestaurants(name,0,0,cousines).subscribe(data =>
      this.restaurantsFromDB = data
    );
  }

  navigateRestaurantSinglePage(id: number) {
    this.router.navigate(['/restaurant/' + id]);
  }
  
}
