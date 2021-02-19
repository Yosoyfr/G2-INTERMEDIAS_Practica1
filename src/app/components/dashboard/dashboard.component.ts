import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  /* Form Group for Users */
  UserForm: FormGroup;
  /*Users*/
  users: User[];
  /*User*/
  user = {
    name: '',
    email: '',
    password: '',
  };
  /*Editing enable*/
  editing = false;

  constructor(
    public userService: UsersService,
    private _Builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.UserForm = this._Builder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
    this.users = this.userService.getUsers();
  }

  ngDoCheck(): void {
    this.users = this.userService.getUsers();
  }

  /** Create */
  addUser(value) {
    var user: User = value;
    this.userService.addUser(user);
    this.resetValues();
  }

  /** Read */
  getUser(email: string) {
    this.user = this.userService.getUser(email);
    this.UserForm.setValue(this.user);
    this.editing = true;
    this.UserForm.controls['email'].disable();
  }

  /** Update */
  updateUser() {
    let user: User = {
      name: this.UserForm.get('name').value,
      email: this.UserForm.get('email').value,
      password: this.UserForm.get('password').value,
    }; //Get values from form.
    this.userService.setUser(user); //Change user
    this.resetValues();
  }

  /** Delete */
  deleteUser() {
    let user: User = {
      name: this.UserForm.get('name').value,
      email: this.UserForm.get('email').value,
      password: this.UserForm.get('password').value,
    }; //Get values from form.
    this.userService.deleteUser(user);
    this.resetValues();
  }

  resetValues() {
    this.editing = false;
    this.UserForm.controls['email'].enable();
    this.UserForm.reset();
  }
}
