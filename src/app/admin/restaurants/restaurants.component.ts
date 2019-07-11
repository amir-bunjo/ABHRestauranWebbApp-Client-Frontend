import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  @Input() addClicked = false;
  @Output() cancelClick = new EventEmitter();
  pages = [1,2,3,4]; //temporarly
  selectedPageIndex = 1;
  maxPageNumber ;
  minPageNumber = 1;
  restaurantsData:any;
  searchForm : FormGroup;

  addTab = 'Basic Details';
  

  constructor(private dialog: MatDialog,private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getRestaurantsData(0);
    this.createSearchForm();
    this.setMaxPageNumber();
  }

  createSearchForm(){
    this.searchForm = new FormGroup({
      'name': new FormControl(null)
    })
  }

  getRestaurantsData(startIndex) {
    this.restaurantService.getRestaurantsNameAndId(startIndex).subscribe(res => { this.restaurantsData = res; console.log(res)})
  }

  cancel () {
    this.cancelClick.emit();
  }

  openDialog() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '150px',
      width: '400px',
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
    let startIndex = (this.selectedPageIndex-1)*9;
    this.getRestaurantsData(startIndex);
  }

  nextPage() {
    this.selectedPageIndex !== this.maxPageNumber ? this.setPageIndex(this.selectedPageIndex + 1) : 0;
  }

  previousPage() {
    this.selectedPageIndex !== this.minPageNumber ? this.setPageIndex(this.selectedPageIndex - 1) : 0;
  }
 



}
