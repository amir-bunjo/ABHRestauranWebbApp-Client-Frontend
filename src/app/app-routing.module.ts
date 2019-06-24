import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { AuthguardService } from './services/authguard.service';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'restaurantlist', component: RestaurantListComponent,canActivate:[AuthguardService]},
    {path: 'restaurant/:id', component: RestaurantComponent,canActivate:[AuthguardService]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
