import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AlertModule, ButtonsModule} from 'ngx-bootstrap';
import { RatingComponent } from './rating/rating.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { HomeGalleryComponent } from './home/home-gallery/home-gallery.component';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselGalleryComponent } from './home/home-gallery/carousel-gallery/carousel-gallery.component';
import { SwiperModule } from 'angular2-useful-swiper';
import { CarouselModule } from 'ngx-bootstrap';
import { FooterComponent } from './home/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RatingComponent,
    HomeGalleryComponent,
    CarouselGalleryComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AlertModule,
    ButtonsModule,
    RatingModule.forRoot(),
    MatButtonModule,
    BrowserAnimationsModule,
    NgbModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
