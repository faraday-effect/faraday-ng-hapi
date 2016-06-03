import { Component, OnInit, Input } from '@angular/core';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import { RegisterService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ],
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
    private registerService: RegisterService) {
  }

  ngOnInit() {
    this.date = new Date();
    this.getUsers();
  }

  register() {
    this.registerService.register(
      this.first_name,
      this.last_name,
      this.email,
      this.password
    ).then(() => this.getUsers());
  }

  private getUsers() {
    this.registerService.getUsers().then(
      users => this.users = users
    );
  }

}
