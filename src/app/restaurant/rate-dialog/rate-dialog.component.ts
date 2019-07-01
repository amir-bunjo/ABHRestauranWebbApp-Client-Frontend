import { Component, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.css']
})
export class RateDialogComponent implements OnInit {
  restaurantRating: number = 1;

  constructor(@Optional() public dialogRef: MatDialogRef<RateDialogComponent>) { }

  ngOnInit() {
  }

  isStarRed(starNumber: number) {

    if (starNumber <= this.restaurantRating)
      return true;
    else
      return false;
  }
}
