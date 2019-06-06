import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { RestaurantService } from 'src/app/services/restaurant.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router, private http: HttpClient,private resService: RestaurantService) { 

    
  }

  ngOnInit() {

    this.createRegisterForm();
  }

  login(){

    this.router.navigate(['/login']);
  }

  createRegisterForm() {

    this.registerForm = new FormGroup({
      'firstname': new FormControl(null),
      'lastname': new FormControl(null),
      'email': new FormControl(null),
      'country': new FormControl(null),
      'city': new FormControl(null),
      'password': new FormControl(),
      'phone': new FormControl(null),
      'accountrole': new FormControl(null)
     
    });

  }

  createAccount(){

    console.log("Clicked create account");

    let rawFormValue = this.registerForm.getRawValue();

    let stringFormValue= JSON.stringify(rawFormValue);

    //console.log(stringFormValue);
 
   this.resService.getAllUsers().subscribe(res => console.log(res)); // testing get operation
    //this.resService.deleteUser(15).subscribe(res => console.log(res)); // testing delete operation

    this.resService.saveUser(JSON.parse(stringFormValue)).subscribe(res => console.log(res));
  }


}
