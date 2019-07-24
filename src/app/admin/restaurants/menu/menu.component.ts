import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { BreakfastComponent } from './breakfast/breakfast.component';
import { DinnerComponent } from './dinner/dinner.component';
import { LunchComponent } from './lunch/lunch.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild(BreakfastComponent) breakfastComponent;
  @ViewChild(LunchComponent) lunchComponent;
  @ViewChild(DinnerComponent) dinnerComponent;

  menuType = "Breakfast"
  menuItemCount = 3;
  mealsArray: Array<Meal> = new Array<Meal>();
  menuItemArray: Array<number> = new Array<number>();
  deletedItemArray: Array<number> = new Array<number>();

  d: Array<string>
  constructor(private restaurantService: RestaurantService,private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.setMenuItemArray();

  }

  printbb() {
    console.log(this.dinnerComponent.mealsEditArray)
  }

  ngAfterViewInit() {
   // this.restaurantBasicDetails = this.basicDetails.message;
    this.cdr.detectChanges();

  }

  saveMeal() {
    console.log('should be saved meal')
    let arr=[];
    console.log('iz save meals: ')
    for(let meal of this.breakfastComponent.mealsArray){
      arr[arr.length]=meal;
    }
    for(let meal of this.lunchComponent.mealsArray){
      arr[arr.length]=meal;
    }
    for(let meal of this.dinnerComponent.mealsArray){
      arr[arr.length]=meal;
    }

    console.log(arr)


   // this.restaurantService.saveMenu(arr).subscribe(res => console.log(res))
    return arr;
  }



  addMenuItem() {
    if (this.menuType === 'Breakfast')
      this.breakfastComponent.addMenuItem();

    if (this.menuType === 'Lunch')
      this.lunchComponent.addMenuItem();

    if (this.menuType === 'Dinner')
      this.dinnerComponent.addMenuItem();

  }

  deleteMenuItem(index) {
    // this.menuItemCount--;
    this.deletedItemArray.push(index);
    // this.setMenuItemArray();
  }

  setMenuItemArray() {

    this.menuItemArray = new Array<number>();
    for (var i = 0; i < this.menuItemCount; i++) {
      this.menuItemArray[i] = i + 1;
    }
  }

  setMealName(event, menuItem) {
    let index = menuItem - 1;
    console.log('menuItem: ' + menuItem + ' name: ' + event.target.value);
    if (!this.mealsArray[index]) this.mealsArray[index] = new Meal();
    this.mealsArray[index].name = event.target.value;
    this.mealsArray[index].mealType = this.menuType;

  }

  isDeleted(menuItem) {
    if (this.deletedItemArray.includes(menuItem))
      return true;
    return false;
  }

  setMealDesc(event, menuItem) {
    let index = menuItem - 1;

    console.log('menuItem: ' + menuItem + 'desc: ' + event.target.value);
    if (!this.mealsArray[index]) this.mealsArray[index] = new Meal();
    this.mealsArray[index].description = event.target.value;

  }

  setMealPrice(event, menuItem) {
    let index = menuItem - 1;

    console.log('menuItem: ' + menuItem + 'price: ' + event.target.value);
    if (!this.mealsArray[index]) this.mealsArray[index] = new Meal();

    this.mealsArray[index].price = event.target.value;


  }
//delete later
  printMealArray() {
    console.log(this.mealsArray);
    let arr = [];
    console.log(this.deletedItemArray)
    for (var i = 0; i < this.mealsArray.length; i++) {
      console.log(this.deletedItemArray.includes(<number>i))
      if (!this.deletedItemArray.includes(<number>i + 1))
        arr[arr.length] = this.mealsArray[i];
    }
    console.log(arr)
   // this.restaurantService.saveMenu(arr).subscribe(res => console.log(res))
    return arr;
  }

  printBreakfast() {
    console.log(this.breakfastComponent.mealsArray);
  }

  printDinner() {
    console.log(this.dinnerComponent.mealsArray);
  }

  printLunch() {
    console.log(this.lunchComponent.mealsArray);
  }

}

export class Meal {

  id;
  name;
  description;
  price;
  mealType;
  mealCategory;
}