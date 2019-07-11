import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-succes-modal',
  templateUrl: './succes-modal.component.html',
  styleUrls: ['./succes-modal.component.css']
})
export class SuccesModalComponent implements OnInit {

  title: string;

  constructor(@Optional() public dialogRef: MatDialogRef<SuccesModalComponent>, private router: Router,@Inject(MAT_DIALOG_DATA) public data:any) {

   }

  ngOnInit() {

    this.title = this.data ? this.data.text : 'Unsuccesfully reserved !!!';
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
