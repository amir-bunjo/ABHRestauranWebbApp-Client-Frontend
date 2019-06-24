import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { AuthguardService } from './services/authguard.service';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ReservationComponent } from './restaurant/reservation/reservation.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'restaurantlist', component: RestaurantListComponent,canActivate:[AuthguardService]},
    {path: 'restaurant/:id', component: RestaurantComponent,canActivate:[AuthguardService]},
    {path: 'reservation/:id', component: ReservationComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
