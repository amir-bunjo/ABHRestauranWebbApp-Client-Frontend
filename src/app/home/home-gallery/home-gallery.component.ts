import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-gallery',
  templateUrl: './home-gallery.component.html',
  styleUrls: ['./home-gallery.component.css']
})
export class HomeGalleryComponent implements OnInit {

  pictureLink= '/assets/img/resImage_300x260.jpg';// currently 
  imageLinks : string[]= [];

  constructor() { }

  ngOnInit() {
    for(var i=0; i<9; i++)
      this.imageLinks[i]= this.pictureLink;  // currently
  }

}
