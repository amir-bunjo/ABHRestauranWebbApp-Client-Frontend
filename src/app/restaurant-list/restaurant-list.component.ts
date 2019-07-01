import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  @ViewChild("name") inputField: ElementRef;
  /* gallery variable*/
  restaurantsFromDB: any;
  restaurantsToPreview: Array<any> = new Array<any>();

  /* paginator variable*/
  pages: number[] = [];
  selectedPageIndex: number = 1;
  maxPageNumber: number;
  minPageNumber: number = 1;

  /* filter box variable*/
  isCollapsedFilterBox: boolean = true;
  restaurantRating: number = 0;
  restaurantPriceFilter: number = 0;
  cousines: String[] = ['American', 'Mexican', 'Japannese', 'Greek', 'Cuban', 'Italian', 'Kontinental',
    'Korean', 'Indian', 'Indonesian', 'Singapore', 'French', 'Spanish'];
  selectedCousines: String[] = [];

  /* search variable*/
  searchForm: FormGroup;

  constructor(private loginService: AuthenticationService, private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.loadRestaurantsData(0);
    this.setMaxPageNumber();
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      'name': new FormControl(null),
    })
  }

  search() {
    this.restaurantService.getMatchedRestaurants(this.searchForm.value.name,this.restaurantRating).subscribe(data =>
      this.restaurantsFromDB = data
    );
  }

  loadNumberOfPages() {
    for (var i = 0; i < this.maxPageNumber; i++)
      this.pages[i] = i + 1;
  }

  loadRestaurantsData(startIndex: number) {
    this.restaurantService.getRestaurantsWithStartIndex(startIndex).subscribe(data => {
      console.log(data);
      this.restaurantsFromDB = data;
      //this.loadRestaurantsOnpage();
      //this.loadNumberOfPages();  
    });
  }

  setMaxPageNumber() {
    this.restaurantService.getRestaurantsTableLength().subscribe(length => {
      this.maxPageNumber = Math.ceil((<number>length) / 9);
      this.loadNumberOfPages();
    });
  }

  logOut() {
    this.loginService.logOut();
    this.router.navigate([""]);
  }

  setPageIndex(i) {
    this.selectedPageIndex = i;
    this.loadRestaurantsData((i - 1) * 9);
  }

  nextPage() {
    this.selectedPageIndex !== this.maxPageNumber ? this.setPageIndex(this.selectedPageIndex + 1) : 0;
  }

  previousPage() {
    this.selectedPageIndex !== this.minPageNumber ? this.setPageIndex(this.selectedPageIndex - 1) : 0;
  }

  clickCousine(cousine: String) {
    let indexOfClicked = this.selectedCousines.indexOf(cousine);
    indexOfClicked === -1 ? this.selectedCousines.push(cousine) : this.selectedCousines.splice(indexOfClicked, 1);
  }


  isStarRed(starNumber: number) {
    if (starNumber <= this.restaurantRating)
      return true;
    else
      return false;
  }

  isPriceFilterRed(priceNumber: number) {
    if (priceNumber <= this.restaurantPriceFilter)
      return true;
    else
      return false
  }

  navigateRestaurantSinglePage(id: number) {
    this.router.navigate(['/restaurant/' + id]);
  }

  editFormInput(): void {
    this.inputField.nativeElement.focus();
  }
}
