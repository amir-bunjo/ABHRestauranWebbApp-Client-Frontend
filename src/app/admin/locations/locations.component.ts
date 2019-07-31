import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  @Input() addClicked = false;
  @Output() cancelClick = new EventEmitter();
  @Output() editClick = new EventEmitter();
  
  locations;
  location = new Location();
  locationsForEdit = new Location ;
  locationForm: FormGroup;
  buttonType = 'Add';
  constructor(private restaurantService:RestaurantService,private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllLocation();
    this.createLocationAddForm();
  }

  createLocationAddForm() {
    this.buttonType = 'Add';
    this.locationsForEdit = new Location();
    this.locationForm = new FormGroup({
      'name': new FormControl(null,Validators.required)
    });
  }

  createLocationEditForm(name) {
    this.locationForm = new FormGroup({
      'name': new FormControl(name,Validators.required)
    });
  }

  cancel () {
    this.createLocationAddForm();
    this.cancelClick.emit();
  }

  getLocationById(locationId){
    console.log('sshhx'+ locationId)
    this.restaurantService.getLocationById(locationId).subscribe(res=> {
      this.buttonType = 'Edit';
      this.locationsForEdit = <any> res;
      this.location.id = this.locationsForEdit.id;
      this.createLocationEditForm(this.locationsForEdit.name)
      //this.cancel();
      this.editClick.emit();
    })
  }

  getAllLocation() {
    this.restaurantService.getAllLocation().subscribe(res => {
      this.locations = res;
    });
  }


  saveLocation() {
    console.log(this.location)
   
    this.location.id = this.locationsForEdit.id 
    this.location.name = this.locationForm.value.name;
    console.log(this.location.id)
    this.restaurantService.saveLocation(this.location).subscribe(res => {
      this.getAllLocation();
      this.createLocationAddForm();
      this.cancel();
     console.log(res)})
  }

  deleteLocation(locationId) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '110px',
      width: '420px',
      data: { title: 'Are you sure to delete this location?' }
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res)
        this.restaurantService.deleteLocationById(locationId).subscribe(res => {
          console.log(res);
          this.getAllLocation();

        });

    });
  }
}

export class Location {
  id;
  name;
}
