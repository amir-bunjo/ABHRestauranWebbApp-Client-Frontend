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

  constructor(private router: Router, private loginService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isUserLoggedIn();
  }

  admin() {
    this.router.navigate(['/admin/dashboard']);
  }
  
  login() {
    this.router.navigate(['/login']);
  }

  home() {
    this.router.navigate(['']);
  }

  restaurants() {
    this.router.navigate(['/restaurantlist']);
  }

  logOut() {
    this.isLoggedIn = false
    this.loginService.logOut();
    sessionStorage.removeItem('role');
    this.router.navigate([""]);
  }

  userHasRoleAdmin(){
    let user: string = sessionStorage.getItem('role');
    if(user==='ADMIN')
      return true;
    return false;    

  }

}
