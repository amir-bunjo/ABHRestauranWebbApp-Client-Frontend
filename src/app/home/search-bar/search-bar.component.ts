import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild("name") inputField: ElementRef;
  @Output() valueChange = new EventEmitter();
  counter = 0;
  searchForm: FormGroup;
  guestNumber: number;
  dropdownActive = false;
  date: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.createSearchForm();
  }

  autoCloseForDropdown(event) {
    var target = event.target;
    if (!target.closest(".dropdown")) {
      if (this.dropdownActive)
        this.dropdownActive = false;
    }
  }

  onDateSelect($event) {
    this.date = this.dateToString($event);
    //this.searchForm.controls['date'].patchValue('sss');
  }

  setGuestNumber(num) {
    this.guestNumber = num;
    this.searchForm.controls['guest'].patchValue(num);
  }

  valueChanged() { // You can give any function name
    var name = this.searchForm.value.name;
    var time = this.searchForm.value.time;
    var date = this.dateToString(this.searchForm.value.date)
    var guest= this.searchForm.value.guest;
    this.counter = this.counter + 1;
    let navigationExtras: NavigationExtras = {
      state: {
        name: this.searchForm.value.name,
        date: this.date,
        time: this.searchForm.value.time  + ':00',
        guest: this.searchForm.value.guest,
      }
    };
    console.log('ns')
    this.valueChange.emit(navigationExtras);
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      'name': new FormControl(null),
      'guest': new FormControl(null),
      'date': new FormControl(null),
      'time': new FormControl(null)
    });
  }

  reserveTable(tableId,restaurantId,restaurantData) {
    //this.date = this.dateToString(this.searchForm.value.date);
    //this.time = this.myForm.value.time;

    let navigationExtras: NavigationExtras = {
      state: {
        tableId: tableId,
        date: this.date,
        time: this.searchForm.value.time + ':00',
        guest: this.searchForm.value.guest,
        restaurant: restaurantData
      }
    };
    this.router.navigate(['/reservation/' + restaurantId], navigationExtras);
  }

  dateToString(date: any) {
    let year = date.year;
    let month = date.month < 10 ? '0' + date.month : date.month;
    let day = date.day < 10 ? '0' + date.day : date.day;

    return <string> (year + '-' + month + '-' + day);
  }


  editFormInput(): void {
    this.inputField.nativeElement.focus();
  }


}
