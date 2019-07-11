import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  addPhotos = false;
  photosArray = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  constructor() { }

  ngOnInit() {
  }


}
