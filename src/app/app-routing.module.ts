import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { AuthguardService } from './services/authguard.service';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ReservationComponent } from './restaurant/reservation/reservation.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'restaurantlist', component: RestaurantListComponent},
    {path: 'restaurant/:id', component: RestaurantComponent},
    {path: 'reservation/:id', component: ReservationComponent},

    {
      path: 'admin',
         // <-- Current Login in user must have role admin
      children: [
        {
          path: 'dashboard',component: AdminDashboardComponent  //,pathMatch: 'full' maybe it's not needed
        }
        // <-- The rest of your admin routes
      ]
    }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
