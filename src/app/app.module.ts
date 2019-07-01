import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AlertModule, ButtonsModule } from 'ngx-bootstrap';
import { RatingComponent } from './rating/rating.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeGalleryComponent } from './home/home-gallery/home-gallery.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbCalendar, NgbCalendarGregorian } from '@ng-bootstrap/ng-bootstrap';
import { CarouselGalleryComponent } from './home/home-gallery/carousel-gallery/carousel-gallery.component';
import { CarouselModule } from 'ngx-bootstrap';
import { FooterComponent } from './home/footer/footer.component';
import { PopularLocationComponent } from './home/popular-location/popular-location.component';
import { SearchBarComponent } from './home/search-bar/search-bar.component';
import { HeaderNavbarComponent } from './home/shared/header-navbar/header-navbar.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { LeafletMapComponent } from './shared/leaflet-map/leaflet-map.component';
import { RateDialogComponent } from './restaurant/rate-dialog/rate-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReservationComponent } from './restaurant/reservation/reservation.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { SuccesModalComponent } from './restaurant/reservation/succes-modal/succes-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RatingComponent,
    HomeGalleryComponent,
    CarouselGalleryComponent,
    FooterComponent,
    PopularLocationComponent,
    SearchBarComponent,
    HeaderNavbarComponent,
    LoginComponent,
    RegisterComponent,
    RestaurantListComponent,
    RestaurantComponent,
    LeafletMapComponent,
    RateDialogComponent,
    ReservationComponent,
    SuccesModalComponent
  ],

  imports: [
    FormsModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    AlertModule,
    ButtonsModule,
    RatingModule.forRoot(),
    MatButtonModule,
    BrowserAnimationsModule,
    NgbModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AmazingTimePickerModule
  ],

  entryComponents: [RateDialogComponent, SuccesModalComponent],
  providers: [{ provide: NgbCalendar, useClass: NgbCalendarGregorian }],
  bootstrap: [AppComponent]
})

export class AppModule { }
