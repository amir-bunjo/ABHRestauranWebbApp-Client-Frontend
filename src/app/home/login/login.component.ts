import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean;

  constructor(private router: Router, private loginService: AuthenticationService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      "email": new FormControl(null),
      "password": new FormControl(null)
    })
  }

  createAccount() {
    this.router.navigate(['/register']);
  }

  checkLogin() {
    let email = this.loginForm.value.email;
    let pass = this.loginForm.value.password;
    (this.loginService.authenticate(email, pass).subscribe(
      data => {
        this.router.navigate(['/restaurantlist'])
        console.log('should be getted user: '+ email)
        this.loginService.getUserByUsername(email).subscribe(res => {
          if((<any>res).accountrole==='ADMIN'){  
            sessionStorage.setItem('role', 'ADMIN')
            this.admin();
          }
          console.log(res)
        })
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        console.log("error")
      }
    )
    );
  }

  admin() {
    this.router.navigate(['/admin/dashboard']);
  }


  userHasRoleAdmin(email){
    this.loginService.getUserByUsername(email).subscribe(res => {
      if((<any>res).accountrole==='ADMIN')
        return true;
      return false;  
      console.log(res)
    })
  }

}
