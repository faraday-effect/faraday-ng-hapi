import { Component, OnInit } from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

@Component({
  moduleId: module.id,
  selector: 'app-todays-topics',
  templateUrl: 'todays-topics.component.html',
  styleUrls: ['todays-topics.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ],
})
export class TodaysTopicsComponent implements OnInit {

  constructor() {}

  ngOnInit() {

  }

}
