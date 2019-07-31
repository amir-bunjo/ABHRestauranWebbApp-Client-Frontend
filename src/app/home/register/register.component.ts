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

  emailErrorMessage:string = '';
  registerForm: FormGroup;
  listOfCreatedEmails = new Array<string>();

  constructor(private router: Router, private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    this.createRegisterForm();
    this.getAllUsersEmails();
  }

  getAllUsersEmails() {

    this.userService.getAllEmails().subscribe(res=> {
      console.log(res);
      this.listOfCreatedEmails=<any>res;
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null,[ Validators.required, Validators.email]),
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

  checkEmaiilRegexForm() {

    let text = this.registerForm.value.email!==null ? this.registerForm.value.email : '';
    var regExp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
     
    console.log(regExp.test(text));
    return regExp.test(text);
  }

  checkEmail(){
      let text = this.registerForm.value.email!==null ? this.registerForm.value.email : '';
     var regExp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
      
     console.log(regExp.test(text))

    
        this.emailErrorMessage = regExp.test(text) ? '' : 'Invalid Email';

    if(this.registerForm.value.email!==null || this.registerForm.value.email !== ""  )
      if(this.listOfCreatedEmails.includes(<string>this.registerForm.value.email))
        return true;
        
       // var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  }

  isConfirmNull() {

    if (this.registerForm.value.confirmpass !== null)
      return true;

    return false;
  }
}


export class AccountModel {
  id: number;
  firstname: String;
  lastname: String;
  email: String;
  country: String;
  city: String;
  password: String;
  phone: String;
  accountrole: String;
}