import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';
import { RestaurantService } from '../services/restaurant.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { count } from 'rxjs/operators';
import { element } from '@angular/core/src/render3';

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
  searchForm: FormGroup;
  navigationExtras;
  dangerAlert = false


  constructor(private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit() {
    // timer(0,1000).subscribe(res => console.log(res));

    this.searchForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'guest': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'time': new FormControl(null, Validators.required)
    });

    for (var i = 0; i < 21; i++)
      this.imageLinks[i] = this.pictureLink;
    this.loadRestaurantsData(0);
    this.restaurantService.getAvailableRestaurants('-',4,'2019-06-22','16:00:00').subscribe(res=> console.log(res))
  }

  loadRestaurantsData(startIndex: number) {

    this.restaurantService.getRestaurantsWithStartIndex(startIndex).subscribe(data => {
      console.log(data);
      this.restaurantsFromDB = data;
      //this.loadRestaurantsOnpage();
      //this.loadNumberOfPages();  
      
    });
  }

  //function for getting available restaurant
  searchMatchedRestaurant(navExtras) {
    var cousines = [];
    this.navigationExtras = navExtras.state;
    console.log('name iz navextras' + navExtras.state.name)
      if(navExtras.state.name ===null || navExtras.state.name === '')
      navExtras.state.name= '-';
    this.restaurantService.getAvailableRestaurants(navExtras.state.name ,navExtras.state.guest,navExtras.state.date,navExtras.state.time).subscribe(res=> {
      console.log(res);
      this.restaurantsFromDB = res;
    })

  }

  navigateRestaurantSinglePage(id: number) {
    this.router.navigate(['/restaurant/' + id]);
  }


  navigateReservationPage(restaurantData,document) {

    if(this.navigationExtras=== undefined  ){
      alert('You have to specified time,date and guest number!!!')
      this.dangerAlert = true;
      this.scrollTo('top')
      return;
    }
        

    this.restaurantService.getTablesBySeats(restaurantData.id, this.navigationExtras.guest,this.navigationExtras.date,this.navigationExtras.time).subscribe(res => {
     console.log(res);
      // this.tablesBySeats = res;
     // this.numberOfTables = this.tablesBySeats.length;

     // this.getAvailableTables(this.date, this.time);
     var tableId = this.getAvailableTableId(res);
     console.log('slobodni sto za rezervaciju je sa id-jem' + tableId)
      this.reserveTable(restaurantData,tableId,this.navigationExtras.guest,this.navigationExtras.date,this.navigationExtras.time);
    });


  }


  getAvailableTableId(tableList) {

    var counter: number = 0;

    for(let table of tableList){
      if(table.reservations.length>0){
        for(let reservation of table.reservations){
          console.log(reservation);
          if(this.isReservationInSelectedScope(reservation.date,reservation.time))
            counter++;
        }
        if(counter===0)
          return table.id;
          
      }
      else {
        console.log("table with id: " + table.id + "don't have any reservayion");
        return table.id;
      }
    }

  }

  isReservationInSelectedScope(date, time) {

    console.log("reservation date and time: "+ date + " " + time)
    let selectedTime = this.navigationExtras.date + ' ' + this.navigationExtras.time;
    let selectedTimeInMls = Date.parse(selectedTime);
    let reservationTimeInMls = Date.parse(date + ' ' + time);
    let hourInMls = 3600000;
    
    let lowLimit = reservationTimeInMls - hourInMls;
    let upLimit = reservationTimeInMls + hourInMls;
  
   // let twoHoursInmls = hourInMls * 2;
   //var estimatedTime = new Date(estimatedDuringTime);
    if (lowLimit < selectedTimeInMls && selectedTimeInMls < upLimit)
      return true;

    return false;  
  }

  reserveTable(restaurantData,tableId,guest,date, time) {
    console.log(this.navigationExtras)
    let navigationExtras: NavigationExtras = {
      state: {
        tableId: tableId,
        date: date,
        time: time.substr(0,5),
        guest: guest,
        restaurant: restaurantData
      }
    };
    this.router.navigate(['/reservation/' + restaurantData.id], navigationExtras);
  }


  scrollTo(className: string):void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
 }


 isPriceActive(priceRange, index) {
  if (index > priceRange)
    return true;
  return false;

}
  
}
