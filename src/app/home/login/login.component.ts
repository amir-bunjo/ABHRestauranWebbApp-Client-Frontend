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
  invalidLogin:boolean;

  constructor(private router: Router,private loginService: AuthenticationService) { }

  ngOnInit() {

    this.createLoginForm();
  }
  createLoginForm(){
    
    this.loginForm = new FormGroup({
      "email": new FormControl(null),
      "password": new FormControl(null)
    })
  }
  createAccount(){

    console.log('clicked create account');

    this.router.navigate(['/register']);
  }

    checkLogin() {
      let email = this.loginForm.value.email;
      let pass = this.loginForm.value.password;
      (this.loginService.authenticate(email,pass).subscribe(
        data => {
          this.router.navigate(['/restaurantlist'])
          this.invalidLogin = false
        },
        error => {
          this.invalidLogin = true
          console.log("error")
        }
      )
      );
  
    }
    

  

}
