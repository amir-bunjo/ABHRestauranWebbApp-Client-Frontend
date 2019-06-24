import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurantId: number;
  restaurantData: any;
  restaurantRating: number = 2; /* temporarly hardcoded */
  restaurantPriceFilter: number = 3;

  menuTypeActive: number = 1;

  constructor(private route: ActivatedRoute, private restauranService: RestaurantService) { }

  ngOnInit() {
    this.restaurantId = this.route.snapshot.params['id'];
    console.log('restaurant id' + this.restaurantId);
    this.getRestaurantData(this.restaurantId);
  }

  getRestaurantData(id: number){

    this.restauranService.getRestaurantById(id).subscribe( data => {
      this.restaurantData = data;
      console.log(this.restaurantData)
    })
  }



  isStarRed (starNumber: number) {

    if(starNumber <= this.restaurantRating)
      return true;
    else
      return false;  
  }

  isPriceFilterRed( priceNumber: number ) {

    if(priceNumber <= this.restaurantPriceFilter)
      return true;
    else
      return false  
  }

  setMenuType(type: number) {
    console.log('cc')
    this.menuTypeActive = type;
  }

  isMenuTypeActive(type:number) {
    if(type===this.menuTypeActive)
      return true;

      return false;
  } 
}
