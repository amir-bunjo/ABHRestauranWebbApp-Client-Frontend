import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  constructor(private loginService: AuthenticationService,private router: Router) { }

  ngOnInit() {
  }
  logOut(){
    this.loginService.logOut();

    this.router.navigate([""]);

  }
}
