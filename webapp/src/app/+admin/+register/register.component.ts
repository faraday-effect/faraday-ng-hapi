import { Component, OnInit, Input } from '@angular/core';

import { UserService } from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  directives: [],
})
export class RegisterComponent implements OnInit {

  debug = true;
  users: any;

  title = 'Create new user';
  date: Date;

  first_name: string;
  last_name: string;
  email: string;
  password: string;

  constructor(
    private userService: UserService) {
  }

  ngOnInit() {
    this.date = new Date();
    this.getUsers();
  }

  register() {
    this.userService.register(
      this.first_name,
      this.last_name,
      this.email,
      this.password
    ).subscribe(() => this.getUsers());
  }

  private getUsers() {
    this.userService.getUsers().subscribe(
      users => this.users = users
    );
  }

}
