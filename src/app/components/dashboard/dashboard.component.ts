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
  user: User;

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

  setUser(value) {
    var user: User = value;
    this.addUser(user);
  }

  getUser(email: string) {
    this.user = this.userService.getUser(email);
    console.log(this.user);
  }

  addUser(user: User) {
    this.userService.addUser(user);
  }
}
