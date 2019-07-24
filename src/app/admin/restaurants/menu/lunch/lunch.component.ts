import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent implements OnInit {
  menuType = "Lunch"
  menuItemCount= 3;
  mealsArray: Array<Meal> = new Array<Meal>();
  menuItemArray: Array<number> = new Array<number>();
  deletedItemArray: Array<number> = new Array<number>();
  mealsEditArray: Array<Meal> = new Array<Meal>();
  constructor() { }

  ngOnInit() {
    this.setMenuItemArray()
  }

  getNameValue(menuItem) {

    if(this.mealsEditArray.length>0 && this.mealsEditArray[menuItem-1]!=undefined){
            return  this.mealsEditArray[menuItem-1].name;
    }
    else
      return '' ;

  }

  getPriceValue(menuItem) {
    if(this.mealsEditArray.length>0 && this.mealsEditArray[menuItem-1]!=undefined){
      return  this.mealsEditArray[menuItem-1].price;
    }
    else
      return '' ;

  }

  getDescriptionValue(menuItem) {

    if(this.mealsEditArray.length>0 && this.mealsEditArray[menuItem-1]!=undefined){
        return  this.mealsEditArray[menuItem-1].description;
    }
    else
      return '' ;

  }


  addMenuItem(){
    this.menuItemCount++;
    this.setMenuItemArray();
  }

  deleteMenuItem(index){
   // this.menuItemCount--;
    this.deletedItemArray.push(index);
    this.mealsArray.splice(index-1,1);

   // this.setMenuItemArray();
  }

  setMenuItemArray(){
    
    this.menuItemArray = new Array<number>();
    for(var i=0;i<this.menuItemCount;i++) {
      this.menuItemArray[i]= i+1;
    }
  }

  setMealName(event, menuItem) {
    let index= menuItem -1;
    console.log('menuItem: '+ menuItem + ' name: ' + event.target.value);
    if(!this.mealsArray[index]) this.mealsArray[index] = new Meal();
    this.mealsArray[index].name = event.target.value;
    this.mealsArray[index].mealType = this.menuType;

  }

  isDeleted(menuItem) {
    if(this.deletedItemArray.includes(menuItem))
      return true;
    return false;  
  }

  setMealDesc(event, menuItem) {
    let index= menuItem -1;

    console.log('menuItem: '+ menuItem + 'desc: ' + event.target.value);
    if(!this.mealsArray[index]) this.mealsArray[index] = new Meal();
    this.mealsArray[index].description = event.target.value;

  }

  setMealPrice(event, menuItem) {
    let index= menuItem -1;

    console.log('menuItem: '+ menuItem + 'price: ' + event.target.value);
    if(!this.mealsArray[index]) this.mealsArray[index] = new Meal();

    this.mealsArray[index].price = event.target.value;


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