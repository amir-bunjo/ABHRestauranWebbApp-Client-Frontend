import { Component, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-succes-modal',
  templateUrl: './succes-modal.component.html',
  styleUrls: ['./succes-modal.component.css']
})
export class SuccesModalComponent implements OnInit {

  constructor(@Optional() public dialogRef: MatDialogRef<SuccesModalComponent>, private router: Router) { }

  ngOnInit() {
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.navigateRestaurantsList();

    });
  }

  close() {
    this.dialogRef.close();
  }

  navigateRestaurantsList() {
    this.router.navigate(['/restaurantlist']);
  }

}
