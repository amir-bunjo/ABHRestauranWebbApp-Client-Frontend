import { Component, OnInit, Input } from '@angular/core';
//import { Meal } from '../menu.component';

@Component({
  selector: 'app-dinner',
  templateUrl: './dinner.component.html',
  styleUrls: ['./dinner.component.css']
})
export class DinnerComponent implements OnInit {
  menuType = "Dinner"
  menuItemCount= 3;
  mealsArray: Array<Meal> = new Array<Meal>();
  menuItemArray: Array<number> = new Array<number>();
  deletedItemArray: Array<number> = new Array<number>();
  restaurantMenuData;

  mealsEditArray: Array<Meal> = new Array<Meal>();

  constructor() { }

  ngOnInit() {
    this.setMenuItemArray();
  }

  print() {
    console.log('hello from restaurant')
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
//mozda obrisat
  setMealNameEdit(name,menuItem) {
    let index= menuItem -1;
    if(!this.mealsArray[index]) this.mealsArray[index] = new Meal();
    this.mealsArray[index].name = name;
    this.mealsArray[index].mealType = this.menuType;
    return name;
  }

  setMealName(event, menuItem) {
    let index= menuItem -1;
    let name = event.target.value ;
    console.log('menuItem: '+ menuItem + ' name: ' + event.target.value);
    if(!this.mealsArray[index]) 
      this.mealsArray[index] = new Meal();

    this.mealsArray[index].name = name;
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