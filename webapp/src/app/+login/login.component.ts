import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router,
    private userService: UserService) {}

  ngOnInit() {
    this.date = new Date();
    if (this.userService.isLoggedIn) {
      this.gotoClasses();
    }
  }

  login() {
    this.userService.login(this.email, this.password)
      .subscribe(
        r => this.gotoClasses()
      );
  }

  logout() {
    this.userService.logout();
  }

  gotoClasses() {
    this.router.navigate(['/classes']);
  }

}
