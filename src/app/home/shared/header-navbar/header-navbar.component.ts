import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})
export class HeaderNavbarComponent implements OnInit {

  isLoggedIn: boolean;
  

  constructor(private router: Router,private loginService: AuthenticationService) { }

  ngOnInit() {
    //this.loginService.authenticate("javainuse","password");
    //this.loginService.logOut();
    
  }

  login(){

    console.log('login clicked');

    this.router.navigate(['/login']);
  }

  home(){
    console.log('home clicked');

    this.router.navigate(['']);
  }

  restaurants(){
    this.isLoggedIn = this.loginService.isUserLoggedIn();
    if(this.isLoggedIn)
      this.router.navigate(['/restaurantlist']);
     else
      this.router.navigate(['/login']); 
  }
  
}
