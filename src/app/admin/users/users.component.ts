import {EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
import { AccountModel } from 'src/app/home/register/register.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { error } from 'util';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  
  @Input() addClicked = false;
  @Output() cancelClick = new EventEmitter();
  buttonType = "Add";
  users;
  userId;
  emailErrorMessage:string = '';
  registerForm: FormGroup;
  listOfCreatedEmails = new Array<string>();

  constructor(private dialog: MatDialog,private userService: UserService,private restaurantService: RestaurantService) { }

  ngOnInit() {

    this.getAllUsersEmails();
    this.createRegisterForm();
    this.getAllUsers();
  }

  getAllUsersEmails() {

    this.userService.getAllEmails().subscribe(res=> {
      console.log(res);
      this.listOfCreatedEmails=<any>res;
    });
  }

  cancel () {
    this.createRegisterForm();
    this.cancelClick.emit();
  }

  createRegisterForm() {
    this.buttonType = "Add";
    this.userId = undefined;
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
    this.buttonType = "Edit";
    this.cancelClick.emit();
   // this.addClicked = true
    this.userService.getUserByid(email).subscribe(res => {
      this.createRegisterEditForm(<any> res);
      this.userId =(<any> res).id;
      this.addClicked =true;
    })
  }

  createRegisterEditForm(userData) {
    this.registerForm = new FormGroup({
      'firstname': new FormControl(userData.firstname, Validators.required),
      'lastname': new FormControl(userData.lastname, Validators.required),
      'email': new FormControl(userData.email, Validators.required),
      'country': new FormControl(1, Validators.required),
      'city': new FormControl(1, Validators.required),
      'password': new FormControl(atob(userData.password), Validators.required),
      'phone': new FormControl(userData.phone, Validators.required),
      'confirmpass': new FormControl(atob(userData.password), Validators.required),
      'accountrole' : new FormControl(userData.accountrole)
    });
  }


  createAccount() {
    var accountModel = new AccountModel();
    accountModel.id = this.userId;
    accountModel.firstname = this.registerForm.value.firstname;
    accountModel.lastname = this.registerForm.value.lastname;
    accountModel.email = this.registerForm.value.email;
    accountModel.country = this.registerForm.value.country;
    accountModel.city = this.registerForm.value.city;
    accountModel.password = btoa(this.registerForm.value.password);
    accountModel.phone = this.registerForm.value.phone;
    console.log(this.registerForm.value.accountrole);
    accountModel.accountrole = this.registerForm.value.accountrole ? this.registerForm.value.accountrole : 'USER';

    let rawFormValue = this.registerForm.getRawValue();
    this.userService.saveUser(accountModel).subscribe(res => console.log(res),error => {
      if(error.status==200)
      {
  
        this.getAllUsers();
        this.cancel();
      }
      else
        alert('Unsuccesfully added user'); 
    });

  }

  deleteUser(userId,username) {
    let loggedUser = sessionStorage.getItem('username');
    if(loggedUser === username){
      this.loggedUserDialog();
      return;
    }

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '110px',
      width: '400px',
      data: { title: 'Are you sure to delete this user?' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.userService.deleteUser(userId).subscribe(res => console.log(res),error => {
          if(error.status==200)
            this.getAllUsers();
          else
            alert('Unsuccesfully deleted user with id:' + userId); 
        }
        );
    });
  }

  loggedUserDialog(){

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '110px',
      width: '400px',
      data: { title: 'Cannot delete logged user!!!' }
    });
    
  }

  checkEmaiilRegexForm() {

    let text = this.registerForm.value.email!==null ? this.registerForm.value.email : '';
    var regExp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
     
    return regExp.test(text);
  }

  checkEmail(){
      let text = this.registerForm.value.email!==null ? this.registerForm.value.email : '';
     var regExp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
        this.emailErrorMessage = regExp.test(text) ? '' : 'Invalid Email';
    if((this.registerForm.value.email!==null || this.registerForm.value.email !== "") && this.buttonType==="Add"  )
      if(this.listOfCreatedEmails.includes(<string>this.registerForm.value.email))
        return true;
        
       // var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  }

}
