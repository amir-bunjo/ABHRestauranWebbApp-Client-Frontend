import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.css']
})
export class RateDialogComponent implements OnInit {
  restaurantRating: number = 0;
  restaurantId: number;
  restaurantData:any;
  rateForm: FormGroup;
  userName= sessionStorage.getItem('username');

  constructor(@Optional() public dialogRef: MatDialogRef<RateDialogComponent>, private activatedRoute: ActivatedRoute,
  @Inject(MAT_DIALOG_DATA) public data:any, private restaurantService: RestaurantService ) { }

  ngOnInit() {
    this.restaurantId = this.activatedRoute.snapshot.params['id'];
    this.restaurantData = this.data ? this.data.restaurant: null;
    console.log(this.data.restaurant)
   this.createRateForm();
    
  }

  createRateForm () {
    this.rateForm = new FormGroup({
      'comment': new FormControl(null)
   })
  }

  isStarRed(starNumber: number) {

    if (starNumber <= this.restaurantRating)
      return true;
    else
      return false;
  }

  save() {
    console.log(this.restaurantRating)
    this.data.restaurant.votes++;
    console.log('rate before: '+  this.data.restaurant.mark )
    this.data.restaurant.mark = (this.data.restaurant.mark * (this.data.restaurant.votes-1) + this.restaurantRating)/this.data.restaurant.votes ;
    console.log('comment: '+  this.rateForm.value.comment + " of user " + this.userName )
    //this.restaurantService.updateRestaurant(this.data.restaurant).subscribe(res => console.log(res));
    var review: Review = new Review();
    review.comment= this.rateForm.value.comment;
    review.restaurantId = this.restaurantData.id;
    review.mark = this.restaurantRating; 
    this.restaurantService.saveReview(review).subscribe(res =>{var s:any=res; console.log(s)},
    error => {
      console.log('error status is: ' + error.status)
      if(error.status===200)
        this.restaurantService.updateRestaurant(this.data.restaurant).subscribe(res => console.log(res));
      else
       alert('Unsuccesfully rated restaurant');  
    });
  }
  

}

export class Review {
  comment: number;
  restaurantId: number;
  mark: number
}


