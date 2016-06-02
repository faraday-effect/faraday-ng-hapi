import { Component, OnInit, Input } from '@angular/core';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';


@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ],
})
export class LoginComponent implements OnInit {

  title = 'Welcome to Faraday';
  date: Date;
  @Input() userName: string;
  @Input() password: string;

  constructor() {}

  ngOnInit() {
    this.date = new Date();
  }

  login() {
    console.log(this.userName);
    console.log(this.password);
  }

}
