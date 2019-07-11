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
  userReview;
  comment: string;

  constructor(@Optional() public dialogRef: MatDialogRef<RateDialogComponent>, private activatedRoute: ActivatedRoute,
  @Inject(MAT_DIALOG_DATA) public data:any, private restaurantService: RestaurantService ) { }

  ngOnInit() {
    this.restaurantId = this.activatedRoute.snapshot.params['id'];
    this.restaurantData = this.data ? this.data.restaurant: null;
    this.userReview = this.data && this.data.review ? this.data.review : null;
    this.restaurantRating = this.data  && this.data.review ? this.data.review.mark: 0;  
    this.comment = this.data  && this.data.review ? this.data.review.comment : null;
    console.log(this.restaurantRating)
    console.log(this.data.restaurant)
   this.createRateForm();
    
  }

  createRateForm () {
    this.rateForm = new FormGroup({
      'comment': new FormControl(this.comment)
   })
  }

  isStarRed(starNumber: number) {

    if (starNumber <= this.restaurantRating)
      return true;
    else
      return false;
  }

  save() {
    console.log('iz review') 
    console.log(this.data.review)
    this.data.restaurant.votes++;
    if(this.data && this.data.review){
     this.data.restaurant.votes--;
     this.data.restaurant
     
     console.log('nije rejtano')
    }


    console.log('rate before: '+  this.data.restaurant.mark )
    console.log('comment: '+  this.rateForm.value.comment + " of user " + this.userName )
    //this.restaurantService.updateRestaurant(this.data.restaurant).subscribe(res => console.log(res));
    var review: Review = new Review();
    review.id = this.data && this.data.review ? this.data.review.id : undefined ;
    review.comment= this.rateForm.value.comment;
    console.log('aaa///// ' + this.restaurantData.id)
    review.restaurantId = this.restaurantData.id;
    review.mark = this.restaurantRating; 
    this.restaurantService.saveReview(review).subscribe(res =>{var s:any=res; console.log(s)},
    error => {
      console.log('error status is: ' + error.status)
      if(error.status===200) {
        this.restaurantService.getRestaurantRating(this.restaurantData.id).subscribe(res => {
          this.data.restaurant.mark = res;
          this.restaurantService.updateRestaurant(this.data.restaurant).subscribe(res => console.log(res));
        });
      }
      else
       alert('Unsuccesfully rated restaurant');  
    });
  }
  

}

export class Review {
  id: number;
  comment: number;
  restaurantId: number;
  mark: number
}


