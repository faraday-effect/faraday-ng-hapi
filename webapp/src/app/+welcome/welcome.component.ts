import { Component, OnInit} from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

//import { TodaysTopicsComponent } from '../todays-topics';
import {
  TodaysTopicsComponent,
  ImportantDatesComponent,
} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    TodaysTopicsComponent,
    ImportantDatesComponent,
  ],
})
export class WelcomeComponent implements OnInit {

  title = 'Welcome to <<section.course.title>>';
  date: Date;

  constructor() {}

  ngOnInit() {
    this.date = new Date();
    console.log(TodaysTopicsComponent);
    console.log(this);
  }

}
