import { Component, OnInit, Input } from '@angular/core';

import { UserService } from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [],
})
export class LoginComponent implements OnInit {

  title = 'Welcome to Faraday';
  date: Date;
  email: string;
  password: string;

  constructor(
    private userService: UserService) {}

  ngOnInit() {
    this.date = new Date();
  }

  login() {
    this.userService.login(this.email, this.password)
      .subscribe(
        r => console.log(r)
      );
  }

  logout() {
    this.userService.logout();
  }

}
