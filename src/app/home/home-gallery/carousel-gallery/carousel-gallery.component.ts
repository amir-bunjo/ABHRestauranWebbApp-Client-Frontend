import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel-gallery',
  templateUrl: './carousel-gallery.component.html',
  styleUrls: ['./carousel-gallery.component.css']
})
export class CarouselGalleryComponent  {
  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = true;
  
 
  slides = [
    {image: '/assets/img/download-res.jpg'},
    {image: '/assets/img/image-pasta.jpg'},
    {image: '/assets/img/download-res.jpg'},
    {image: '/assets/img/download-res.jpg'},
    {image: '/assets/img/download-res.jpg'},
    {image: '/assets/img/download-res.jpg'},
    {image: '/assets/img/download-res.jpg'},
    {image: '/assets/img/download-res.jpg'},
    {image: '/assets/img/download-res.jpg'},
    {image: '/assets/img/download-res.jpg'}
  ];

  change(){

    console.log('changed');
  }

}



