import {EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
import { AccountModel } from 'src/app/home/register/register.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() addClicked = false;
  @Output() cancelClick = new EventEmitter();
  users;
  registerForm: FormGroup
  constructor(private userService: UserService,private restaurantService: RestaurantService) { }

  ngOnInit() {

    this.createRegisterForm();
    this.getAllUsers();
  }

  cancel () {
    this.cancelClick.emit();
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


  getAllUsers() {
    this.userService.getAllUsers().subscribe(res => {
      this.users= res;
    })
  }

  getUserById(email) {
    console.log('should be gettes userData')
   // this.addClicked = true
    this.userService.getUserByEmail(email).subscribe(res => {
      this.createRegisterEditForm(<any> res);
      this.addClicked =true;
    })
  }

  createRegisterEditForm(userData) {
    this.registerForm = new FormGroup({
      'firstname': new FormControl(userData.firstname, Validators.required),
      'lastname': new FormControl(userData.lastname, Validators.required),
      'email': new FormControl(userData.email, Validators.required),
      'country': new FormControl(userData.country, Validators.required),
      'city': new FormControl(userData.city, Validators.required),
      'password': new FormControl(userData.password, Validators.required),
      'phone': new FormControl(userData.phone, Validators.required),
      'confirmpass': new FormControl(userData.password, Validators.required)
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
    this.userService.saveUser(accountModel).subscribe(res => console.log(res),error => {
      if(error.status==200)
        this.addClicked = false;
      else
        alert('Unsuccesfully reserved'); 
    });

  }

}
