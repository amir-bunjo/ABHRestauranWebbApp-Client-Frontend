import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel-gallery',
  templateUrl: './carousel-gallery.component.html',
  styleUrls: ['./carousel-gallery.component.css']
})
export class CarouselGalleryComponent implements OnInit {
  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = true;
  previewImage = [];
  pageIndex = 1;
  maxPageNumber = 9;

  ngOnInit() {
    this.getSlide();
  }

  slides = [
    { image: '/assets/img/download-res.jpg' },
    { image: '/assets/img/image-pasta.jpg' },
    { image: '/assets/img/background-specials.png' },
    { image: '/assets/img/restaurant-food-salat-2.jpg' },
    { image: '/assets/img/download-res.jpg' },
    { image: '/assets/img/download-res.jpg' },
    { image: '/assets/img/download-res.jpg' },
    { image: '/assets/img/download-res.jpg' },
    { image: '/assets/img/download-res.jpg' },
    { image: '/assets/img/download-res.jpg' }
  ];

  change() {
    console.log('changed');
  }

  getSlide() {
    for (var i = 0; i < 3; i++) 
      this.previewImage[i] = this.slides[i].image
  }

  index(i: number) {
    if (i < 3)
      return true;
    return false;
  }

  previous() {
    if (this.pageIndex > 1)
      --this.pageIndex;
    var index = this.pageIndex;
    this.previewImage = [];
    for (var i = 0; i < 3; i++) {
      this.previewImage[i] = this.slides[index].image
      index++;
    }
  }

  next() {
    if (this.pageIndex < this.maxPageNumber)
      ++this.pageIndex;
    var index = this.pageIndex;
    this.previewImage = [];
    for (var i = 0; i < 3; i++) {
      this.previewImage[i] = this.slides[index].image
      index++;
    }
  }

}



