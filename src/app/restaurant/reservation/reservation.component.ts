import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material';
import { SuccesModalComponent } from './succes-modal/succes-modal.component';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {


  reservationModel: any;
  reservationForm: FormGroup;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private router: Router, private restaurantService: RestaurantService, private auth: AuthenticationService) {
    this.getRouterData();
    this.createReservationForm()

  }
  ngOnInit() {
  }

  isUserLoggedIn() {
    return this.auth.isUserLoggedIn();
  }

  saveReservation(){
    console.log(this.reservationModel)

    if(this.reservationModel===undefined){
      console.log('err')
      let dialogRef = this.dialog.open(SuccesModalComponent, {
        height: '150px',
        width: '400px',
      });
     // return;
    }
  
   // console.log(this.reservationModel.time)
    this.restaurantService.saveReservation(this.reservationModel).subscribe(
      res => { console.log(res); let dialogRef = this.dialog.open(SuccesModalComponent, {
        height: '150px',
        width: '400px',
        data: { text: 'Successfully reserved'}
      });  },
      error => { console.log('error');let dialogRef = this.dialog.open(SuccesModalComponent, {
        height: '150px',
        width: '400px'
      });      }
    )
  }



  createReservationForm() {
    this.reservationForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'numbertype': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'specrequest': new FormControl(null)
    });
  }

  getRouterData() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.reservationModel = this.router.getCurrentNavigation().extras.state;
        console.log(this.reservationModel);
      }
    });
  }

  navigateRestaurantSinglePage(id: number) {
    this.router.navigate(['/restaurant/' + id]);
  }


  completeReservation() {
   this.saveReservation();
  

    
  }



}
