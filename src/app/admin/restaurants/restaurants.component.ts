import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { HereService } from 'src/app/shared/here/here.service';
import { Subject } from 'rxjs';
import { MenuComponent } from './menu/menu.component';
import { Meal } from './menu/dinner/dinner.component';
import { TablesComponent } from './tables/tables.component';



@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  //private eventsSubject: Subject<void> = new Subject<void>();
  @Input() addClicked = false;
  @Output() cancelClick = new EventEmitter();
  @ViewChild(BasicDetailsComponent) basicDetails;
  @ViewChild(MenuComponent) menuComponent;
  @ViewChild(TablesComponent) tableComponent;
  tablesInDB;


  buttonType = 'Add'
  pages = [1, 2, 3, 4]; //temporarly
  selectedPageIndex = 1;
  maxPageNumber;
  minPageNumber = 1;
  restaurantsData: any;
  searchForm: FormGroup;

  addTab = 'Basic Details';

  restaurantBasicDetails = '';

  constructor(private dialog: MatDialog, private restaurantService: RestaurantService, private cdr: ChangeDetectorRef, private hereService: HereService) { }

  ngOnInit() {
    this.getRestaurantsData(0);
    this.createSearchForm();
    this.setMaxPageNumber();


  }

  getPagesLength() {
    console.log(this.pages.length)
    return this.pages.length;
  }

  print() {
    this.menuComponent.dinnerComponent.print();
  }

  edit(restaurantId) {
    // this.menuComponent.dinnerComponent.m
    this.cancel(); ///ovdje staooo pogledati jos
    this.buttonType = 'Update'
    this.restaurantService.getRestaurantById(restaurantId).subscribe(res => {

      this.loadRestaurantsFormData(<any>res);
      this.tablesInDB =(<any> res).tables;
    });


  }

  loadRestaurantsFormData(restaurantData) {
    this.createBasicDetailsEditForm(restaurantData);
    this.createMenuEditForm(restaurantData);
  }

  createMenuEditForm(restaurantData) {
    console.log(restaurantData.meals);


    this.menuComponent.breakfastComponent.mealsArray = [];
    this.menuComponent.lunchComponent.mealsArray = [];
    this.menuComponent.dinnerComponent.mealsArray = [];

    for (let meal of restaurantData.meals) {
      if (meal.mealType === "Breakfast")
        this.menuComponent.breakfastComponent.mealsArray.push(meal)
      if (meal.mealType === "Lunch")
        this.menuComponent.lunchComponent.mealsArray.push(meal)
      if (meal.mealType === "Dinner")
        this.menuComponent.dinnerComponent.mealsArray.push(meal)
    }

    this.menuComponent.breakfastComponent.menuItemCount = this.menuComponent.breakfastComponent.mealsArray.length !== 0 ?  this.menuComponent.breakfastComponent.mealsArray.length : 3;
    this.menuComponent.lunchComponent.menuItemCount =    this.menuComponent.lunchComponent.mealsArray.length !== 0 ?  this.menuComponent.lunchComponent.mealsArray.length : 3;
    this.menuComponent.dinnerComponent.menuItemCount = this.menuComponent.dinnerComponent.mealsArray.length !== 0 ?  this.menuComponent.dinnerComponent.mealsArray.length : 3;

    this.menuComponent.breakfastComponent.mealsEditArray = this.menuComponent.breakfastComponent.mealsArray;
    this.menuComponent.breakfastComponent.setMenuItemArray();
    this.menuComponent.lunchComponent.mealsEditArray = this.menuComponent.lunchComponent.mealsArray;
    this.menuComponent.lunchComponent.setMenuItemArray();
    this.menuComponent.dinnerComponent.mealsEditArray = this.menuComponent.dinnerComponent.mealsArray;
    this.menuComponent.dinnerComponent.setMenuItemArray();

    console.log(restaurantData.meals.length)
  }

  createBasicDetailsEditForm(restaurantData) {
    this.basicDetails.basicDetailForm = new FormGroup({
      'name': new FormControl(restaurantData.name, Validators.required),
      'pricerange': new FormControl(restaurantData.priceRange , Validators.required),
      'category': new FormControl('Vegeterian', Validators.required),
      'description': new FormControl(restaurantData.description, Validators.required),
      'searchAdress': new FormControl(null)
    })

    this.basicDetails.restaurantId = restaurantData.id;
    this.basicDetails.logoImageString = restaurantData.promophoto;
    this.basicDetails.coverImageString = restaurantData.coverphoto;
    this.basicDetails.category;
    sessionStorage.setItem('latitude',restaurantData.latitude);
    sessionStorage.setItem('longitude',restaurantData.longitude);
    let that = this;
    setTimeout(function () {
      console.log('iz tajmera')
      that.basicDetails.loadMap(restaurantData.latitude !== undefined ? restaurantData.latitude : 45.8616156, restaurantData.longitude !== undefined ? restaurantData.longitude : 17.417399, 'newmap');
    }, 1);

  }

  receiveBasicDetailsData(event) {
    this.restaurantBasicDetails = event;
  }

  ngAfterViewInit() {
    this.restaurantBasicDetails = this.basicDetails.message;
    this.cdr.detectChanges();

  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      'name': new FormControl(null)
    })
  }

  getRestaurantsData(startIndex) {
    this.restaurantService.getRestaurantsNameAndId(startIndex).subscribe(res => { this.restaurantsData = res; console.log(res) })
  }

  cancel() {

    this.addTab = "Basic Details";
    this.cancelClick.emit();
  }

  deleteRestaurant(restaurantId) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '150px',
      width: '400px',
      data: { title: 'Are you sure to delete this restaurant?' }
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res)
        this.restaurantService.deleteRestaurant(restaurantId).subscribe(res => {
          console.log(res);
          let startIndex = (this.selectedPageIndex - 1) * 9;
          this.getRestaurantsData(startIndex)
          this.loadNumberOfPages();

        });

    });
  }

  loadNumberOfPages() {
    this.pages = [];
    for (var i = 0; i < this.maxPageNumber; i++)
      this.pages[i] = i + 1;
  }

  setMaxPageNumber() {
    this.restaurantService.getRestaurantsTableLength().subscribe(length => {
      this.maxPageNumber = Math.ceil((<number>length) / 9);
      this.loadNumberOfPages();
    });
  }

  setPageIndex(i) {
    this.selectedPageIndex = i;
    let startIndex = (this.selectedPageIndex - 1) * 9;
    this.getRestaurantsData(startIndex);
  }

  nextPage() {
    this.selectedPageIndex !== this.maxPageNumber ? this.setPageIndex(this.selectedPageIndex + 1) : 0;
  }

  previousPage() {
    this.selectedPageIndex !== this.minPageNumber ? this.setPageIndex(this.selectedPageIndex - 1) : 0;
  }

  addRestaurant() {
    console.log('clicked add')

    let name = this.basicDetails.basicDetailForm.value.name;
    let pricerange = this.basicDetails.basicDetailForm.value.pricerange;
    let category = this.basicDetails.basicDetailForm.value.category;
    let description = this.basicDetails.basicDetailForm.value.description;
    let coverImage = this.basicDetails.coverImageString ? this.basicDetails.coverImageString : '';
    let logoImage = this.basicDetails.logoImageString ? this.basicDetails.logoImageString : '';
    let latitude = sessionStorage.getItem('latitude'); // this.basicDetails.coordinates.latitude
    let longitude =sessionStorage.getItem('longitude'); //this.basicDetails.coordinates.latitude;  
    let coverName = this.basicDetails.imageNames.get('cover');
    let logoName = this.basicDetails.imageNames.get('logo');
    
      let meals = this.menuComponent.saveMeal();



    var restaurantModel: Restaurant = new Restaurant();

    console.log('restaurant id: ' + this.basicDetails.restaurantId)

    restaurantModel.id = this.basicDetails.restaurantId;
    restaurantModel.cityId = 1;
    restaurantModel.description = description;
    restaurantModel.name = name;
    restaurantModel.promophoto = logoImage;
    restaurantModel.coverphoto = coverImage;
    restaurantModel.priceRange = pricerange;
    restaurantModel.latitude = latitude;
    restaurantModel.longitude = longitude;
    restaurantModel.foodTypes = category;
    console.log('meals:   ')
    console.log(meals)
    restaurantModel.meals = meals;

    console.log('iz rest:')
    console.log(restaurantModel.meals)
    console.log('name: ' + name);
    console.log('pricerange: ' + pricerange)
    console.log('category: ' + category)
    console.log('description: ' + description)
    console.log('latitude: ' + latitude)
    console.log('longitude: ' + longitude)
    console.log('cover image name: ' + this.basicDetails.imageNames.get('cover'))
    console.log('logo image name: ' + this.basicDetails.imageNames.get('logo'))

    this.hereService.getAddressFromLatLng(latitude + ',' + longitude).then(result => {
      let location = result[0].Location.Address.Label;
      console.log(result)
      console.log(location)
      restaurantModel.street = location;
      if(this.tableComponent!==undefined)
       restaurantModel.tables = this.tableComponent.saveTable();
      console.log(restaurantModel);
      //  this.restaurantService.saveImageToCloudinary(1,coverImage).subscribe(res => console.log(res))
      this.restaurantService.saveRestaurant(restaurantModel, coverName, logoName).subscribe(res => {
        console.log(res);
        this.selectedPageIndex = 1;
        let startIndex = (this.selectedPageIndex - 1) * 9;
        this.getRestaurantsData(startIndex)
        this.loadNumberOfPages();
        this.addClicked = false;
        this.cancel();
      })

    });


    console.log('cover image ispod: ');
    console.log(coverImage);

    console.log('logo image ispod: ');
    console.log(logoImage);


  }

  isFormValid() {
    if(sessionStorage.getItem('latitude')=== undefined ||  !this.basicDetails.basicDetailForm.valid)
      return true;
    else
      return false
  }





}

export class Restaurant {
  id;
  cityId;
  name;
  street;
  priceRange;
  description;
  promophoto;
  coverphoto;
  latitude;
  longitude;
  mark = 1;
  foodTypes;
  votes = 0;
  meals = [];
  tables = [];
}
