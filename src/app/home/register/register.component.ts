import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { parseIsoWeekday } from 'ngx-bootstrap/chronos/units/day-of-week';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router, private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  login() {
    this.router.navigate(['/login']);
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'confirmpass': new FormControl(null, Validators.required)
    });
  }

  createAccount() {
    var accountModel = new AccountModel();
    accountModel.firstname = this.registerForm.value.firstname;
    accountModel.lastname = this.registerForm.value.lastname;
    accountModel.email = this.registerForm.value.email;
    accountModel.country = this.registerForm.value.country;
    accountModel.city = this.registerForm.value.city;
    accountModel.password = btoa(this.registerForm.value.password);
    accountModel.phone = this.registerForm.value.phone;
    accountModel.accountrole = 'USER';

    let rawFormValue = this.registerForm.getRawValue();
    this.userService.saveUser(accountModel).subscribe(res => this.router.navigate(['/login']),error => {
      if(error.status==200)
        this.router.navigate(['/login']);
      else
        alert('Unsuccesfully reserved'); 
    });

  }


  checkPassword() {
    if (this.registerForm.value.password === this.registerForm.value.confirmpass)
      return false;

    return true;

  }

  isConfirmNull() {

    if (this.registerForm.value.confirmpass !== null)
      return true;

    return false;
  }
}


export class AccountModel {
  firstname: String;
  lastname: String;
  email: String;
  country: String;
  city: String;
  password: String;
  phone: String;
  accountrole: String;
}