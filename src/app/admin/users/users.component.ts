import {EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() addClicked = false;
  @Output() cancelClick = new EventEmitter();
  users = ['Amir','Asad','Kristina','Andela']
  registerForm: FormGroup
  constructor() { }

  ngOnInit() {

    this.createRegisterForm();
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
}
