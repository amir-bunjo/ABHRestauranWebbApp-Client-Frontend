import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})
export class HeaderNavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(){

    console.log('login clicked');

    this.router.navigate(['/login']);
  }

}
