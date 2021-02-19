import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  /*Usuarios*/
  public users: User[] = [
    {
      email: 'francisco16lopez@hotmail.com',
      name: 'Francisco Suarez',
      password: 'password',
    },
    {
      email: 'ferjotello@gmail.com',
      name: 'Fernando Tello',
      password: 'password',
    },
    {
      email: 'bombasir@gmail.com',
      name: 'Monther Basir',
      password: 'password',
    },
    {
      email: 'curioso@gmail.com',
      name: 'Jorge Juarez',
      password: 'password',
    },
    {
      email: 'joshiiiiit@gmail.com',
      name: 'Jose Jimenez',
      password: 'password',
    },
  ];

  constructor() {}

  setUser(user: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email == user.email) {
        this.users[i] = user;
        console.log(this.users)
        break;
      }
    }
  }

  addUser(user: User) {
    this.users.push(user);
  }

  deleteUser(user: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email == user.email) {
        this.users.splice(i,1);
        console.log(this.users)
        break;
      }
    }
    this.users = this.users.filter((e) => e !== user);
  }

  getUsers() {
    return this.users;
  }

  getUser(email: string) {
    return this.users.find((e) => e.email === email);
  }
}
