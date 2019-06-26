import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import {MatDialog} from '@angular/material/dialog';
import { RateDialogComponent } from './rate-dialog/rate-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fillProperties } from '@angular/core/src/util/property';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import 'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js'
import { AuthenticationService } from '../services/authentication.service';

declare let L;

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
  model;
  restaurantId: number;
  restaurantData: any;
  restaurantRating: number = 2; /* temporarly hardcoded */
  restaurantPriceFilter: number = 3;

  menuTypeActive: number = 1;
  time: String = "00";
  date: String;
  myForm: FormGroup;
  guestNumber: number;
  dropdownActive: boolean = false;

  findClicked=false;

  reservationToday;
  availableTableNumber=0;
  availableList: Array<Available> = new Array<Available>();

  tablesBySeats: any
  reservationsBySeatsAndDate: any;
  numberOfReservations: number // for storing number of tables with selected number of guest in form
  numberOfTables: number // for number of reservations on selected date
  openAt = '10:00:00';
  closeAt = '23:00:00';

  constructor(private auth: AuthenticationService,private atp: AmazingTimePickerService ,private router: Router ,private activatedRoute: ActivatedRoute, private restaurantService: RestaurantService,private dialog: MatDialog) { 
  
  }

  ngOnInit() {
    
    this.createReservationForm();
    this.restaurantId = this.activatedRoute.snapshot.params['id'];
    console.log('restaurant id' + this.restaurantId);
    this.getRestaurantData(this.restaurantId);
    //this.getAvailableTable();
    
      
    setTimeout(() => {
      this.onChanges();

  }, 1000);

  }

  isUserLoggedIn(){
    return this.auth.isUserLoggedIn();
  }

  getAvailableTable() {

    this.restaurantService.getCountOfAvailableTable(this.restaurantId).subscribe(res => this.availableTableNumber = <number> res);
  }

  createReservationForm(){
    this.myForm = new FormGroup({
      'guest': new FormControl(null,Validators.required),
      'date' : new FormControl(null,Validators.required),
      'time' : new FormControl(null,Validators.required)
    });

  
    
  }

  write(event) {
    console.log('first clicked'  + this.myForm.value.guest);
    console.log(event)

  }
/* Change name */
  autoCloseForDropdownCars(event) {
    var target = event.target;
    if (!target.closest(".dropdown")) { 
       if(this.dropdownActive)
        this.dropdownActive = false;
    }
}

setGuestNumber(num){

  this.guestNumber = num;
  this.myForm.controls['guest'].patchValue(num);
  
 
}

findAvailableTable() {
  this.findClicked = !this.findClicked;
  this.time = this.myForm.value.time;

  console.log(this.time)
  this.restaurantService.getCountOfAvailableTable(this.restaurantId).subscribe(res => console.log('slobodni stolovi' + res));
  this.getTodayReservedNumber();
  //getting res by date,time,guestnumber... maybe should delete
  this.restaurantService.getReservetionsByDateAndGuestNumber(this.restaurantId,this.date.toString(),this.guestNumber,this.time+':00').subscribe(
    res => { 
      console.log(res)
      this.reservationsBySeatsAndDate = res;
      this.numberOfReservations = this.reservationsBySeatsAndDate.length;        
    }
  );
  //getting tables by seats,restaurant_id,date and time
  this.restaurantService.getTablesBySeats(this.restaurantId,this.guestNumber,this.date,this.time+':00').subscribe(res => {
      console.log(res);
      this.tablesBySeats  = res;
      this.numberOfTables = this.tablesBySeats.length;

      this.getAvailableTables(this.date,this.time);
  });

  //this.isTableAvailable(this.date,this.time);
}


  changeReservetionForm(guest: number,date: String, time: String){

    this.myForm = new FormGroup({
      'guest': new FormControl(guest,Validators.required,),
      'date' : new FormControl(date,Validators.required),
      'time' : new FormControl(time,Validators.required)
    });
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  reserveTable(tableId,time) {
   
    
    this.date = this.dateToString(this.myForm.value.date);
    this.time = this.myForm.value.time;

    console.log('find table date: ' + this.time)
    let navigationExtras: NavigationExtras = {
      state: {
        tableId: tableId,
        date: this.date,
        time: time,
        guest: this.guestNumber,
        restaurant: this.restaurantData
      }
    };
    this.router.navigate(['/reservation/'+ this.restaurantId],navigationExtras);
  }

  rateRestaurant() {
    let dialogRef = this.dialog.open(RateDialogComponent, {
      height: '500px',
      width: '600px',
    });
  }

  getRestaurantData(id: number){

    this.restaurantService.getRestaurantById(id).subscribe( data => {
      this.restaurantData = data;
     this.loadMap(43.8616156,18.417399);
      console.log(this.restaurantData.latitude,this.restaurantData.longitude)
    })
  }

  onDateSelect($event) {
    
    console.log('edss')
    console.log($event);
    this.date = this.dateToString($event);
    console.log(this.date)
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
    this.menuTypeActive = type;
  }

  isMenuTypeActive(type:number) {
    if(type===this.menuTypeActive)
      return true;

      return false;
  } 
  

  onChanges(): void {
    this.myForm.valueChanges.subscribe(val => {
      this.time = this.myForm.value.time;
      console.log('selected time: ' + this.time )
      this.changeReservetionForm(this.guestNumber,this.date,this.time);
    });

   this.changeReservetionForm(null,null,null); //check out later
  }

  openTimePicker(event: any) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.time = time;
      this.changeReservetionForm(this.guestNumber,this.date,this.time);
      this.time = this.myForm.value.time;
    });
  }

  dateToString(date:any){
    let year = date.year;
    let month = date.month<10 ? '0' + date.month: date.month;
    let day = date.day<10 ? '0' + date.day: date.day;

    return (year + '-' + month + '-' + day);
  }

  getTodayReservedNumber() {
    this.restaurantService.getTodayReservedNumber(this.restaurantId,this.date).subscribe(res=> this.reservationToday = res);
  }

  checkDuplicateAndPush(availableList: Array<Available>,availableForCheck: Available) {

  }


  isAvailableDuplicate(availableList: Array<Available>,availableForCheck: Available){
    
    for(let available of availableList){
      if(available.time===availableForCheck.time)
        return true;
    }

    return false;
   
  }

  getAvailableTables(date:String,time: String) {

    this.availableTableNumber = 0;
    this.availableList = new Array<Available>();
  
 var available:Available = new Available();
   for(let table of this.tablesBySeats ){//passing through tables with selected seats
      if(table.reservations[0] === undefined){
        available = new Available()
        available.tableId = table.id;
        available.time = time;
        this.availableTableNumber++;
        if(!this.isAvailableDuplicate(this.availableList,available))
          this.availableList.push(available);
      }
     for(let reservations of table.reservations ){ //passing through tables reservations
        let resultAvailibility =  this.isReservationInSelectedScope(reservations.date , reservations.time);
       if(resultAvailibility!== null && resultAvailibility!==undefined ){
        let potentialAvailable = new Available()
        potentialAvailable.tableId = table.id;
        potentialAvailable.time = resultAvailibility;
          if(this.isPotentialAvailable(potentialAvailable)){
            this.availableTableNumber++;
            if(!this.isAvailableDuplicate(this.availableList,potentialAvailable))
             this.availableList.push(potentialAvailable);
            }
       }
     }
   }    
  console.log(this.availableList)
  }

  isPotentialAvailable(available: Available) {

      for(let table of this.tablesBySeats){
        if(table.id===available.tableId){
          for(let reservations of table.reservations ){
           if  (!this.isTableAvailable(reservations.time,reservations.date,available.time))
            return false;
          }
        }
        
      }
      return true;

  }

  isTableAvailable(timeReservation,dateReservation,timePotential) {

    var timeRes = Date.parse(dateReservation + ':' + timeReservation);
    var timePot = Date.parse(this.date + ':' + timePotential);
    let hourInMls = 3600000;
    
    if(timeRes-hourInMls < timePot && timePot< timeRes + hourInMls)
      return false
    return true;
  }
  
  isReservationInSelectedScope(date,time) {
    
    console.log('vrijeme iz rezervacije' + date + ' ' + time);

    let selectedTime = this.date + ' ' + this.time;
    let selectedTimeInMls = Date.parse(selectedTime);
    let dateFromReservetionList = Date.parse(date + ' ' +time);

    let estimatedDuringTime = dateFromReservetionList +3600000;

    console.log('zeljeno vrijeme za rezervaciju koje treba provjeriti ' + selectedTime);
   


    console.log('procjenjeno vrijeme ostajanja' + estimatedDuringTime);

    let hourInMls = 3600000;
    let quartal = 3600000/4;
    let halfInMls = 36000/2;
    let twoHoursInmls = hourInMls*2;
    console.log(selectedTimeInMls+twoHoursInmls)
    var estimatedTime = new Date( estimatedDuringTime );
    console.log('------OD estimadedd aaaa' + estimatedTime.toTimeString())
    console.log('ODPARSIRANO'+ estimatedTime)

    if(dateFromReservetionList<selectedTimeInMls && selectedTimeInMls < estimatedDuringTime){
      console.log("U PERIODU JE I TREBALO BI GA ZANEMARIT")
        return null;
    }
    else if(selectedTimeInMls - twoHoursInmls  <= estimatedDuringTime && estimatedDuringTime <= selectedTimeInMls + twoHoursInmls){
      
      console.log('--------------MOGAO BI SE UZET U OBZIR-----------')
      return estimatedTime.toLocaleTimeString().substr(0,5);
    }

  }

  loadMap(latitude,longitude) {
    var icon = {
      icon: L.icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 0 ],
        // specify the path here
        iconUrl: './node_modules/leaflet/dist/images/marker-icon.png',
        shadowUrl: './node_modules/leaflet/dist/images/marker-shadow.png'
     })
  };
    const map = new L.map('map').setView([latitude,longitude], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const marker = L.marker([latitude,longitude ], icon).addTo(map);
   // var marker1 = L.marker([latitude, latitude]).addTo(map);
    marker.bindPopup("<b>Here is location of restaurant!</b>").openPopup();
    
  }

}

export class Available {

  tableId: number;
  time: String;

}