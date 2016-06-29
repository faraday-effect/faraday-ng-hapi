import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  ToolbarConfigService,
  UserService,
} from 'app/shared';

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
    private toolbarConfig: ToolbarConfigService,
    private router: Router,
    private userService: UserService) {}

  ngOnInit() {
    this.date = new Date();
    this.toolbarConfig.title = this.title;
  }

  login() {
    this.userService.login(this.email, this.password)
      .subscribe(
        r => this.gotoCourses()
      );
  }

  gotoCourses() {
    this.router.navigate(['/courses']);
  }

}
