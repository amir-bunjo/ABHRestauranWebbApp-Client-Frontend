import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  tableItemCount: number =3;
  tableItemArray = [1,2,3];
  tablesToSave = new Array<Table>();
  tablesFormArray = new Array<TableForm>();
  deletedItemArray = new Array<TableForm>();
  restaurantId:number;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
  }

  setTableType(type,menuItem){
    let size = menuItem-1;
    console.log('should be setted type: '+ type.target.value)
    if (!this.tablesFormArray[size]) this.tablesFormArray[size] = new TableForm();
    this.tablesFormArray[size].seats = type.target.value;

  }

  setTableAmount(amount,menuItem) {
    let size = menuItem-1;
    console.log('should be setted amount: '+ amount.target.value)
    if (!this.tablesFormArray[size]) this.tablesFormArray[size] = new TableForm();
    this.tablesFormArray[size].amount = amount.target.value;

  }

  addTableForm() {
    this.tableItemCount++;
    this.setTableItemArray();
    //  let deleted =  this.deletedItemArray.indexOf()
    //this.deletedItemArray.slice()
  }

  deleteTableForm(index) {
    // this.menuItemCount--;
    this.deletedItemArray.push(index);
    this.tableItemCount --;
    this.setTableItemArray();
    // this.setMenuItemArray();
  }

  isDeleted(tableItem) {
    if(this.deletedItemArray.includes(tableItem))
      return true;
    return false;  
  }

  setTableItemArray() {
    this.tableItemArray =[];
    for(var i=0;i<this.tableItemCount;i++)
      {
        this.tableItemArray.push(i+1);
      }
  }

  saveTable() {

    console.log(this.tablesFormArray)
    let array = [];
    for(var i=0;i<this.tablesFormArray.length;i++){
      for(var j=0;j<this.tablesFormArray[i].amount;j++){
        let table = new Table();
        table.seats = this.tablesFormArray[i].seats;
        console.log(j+i + '. sholud be added to database table with seats: ' + this.tablesFormArray[i].seats)
        array.push(table);
      }
    }

    console.log(array);

    this.restaurantService.saveTables(array).subscribe(res => console.log(res));
  }

}


export class Table {
  id;
  seats;
}

export class TableForm {
  seats;
  amount: number;
}
