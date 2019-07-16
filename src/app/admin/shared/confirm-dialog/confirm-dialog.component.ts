import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  title;

  constructor(@Optional() public dialogRef: MatDialogRef<ConfirmDialogComponent>, private router: Router,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {

    this.title = this.data && this.data.title ? this.data.title: 'Confirm modal';
  }



}
