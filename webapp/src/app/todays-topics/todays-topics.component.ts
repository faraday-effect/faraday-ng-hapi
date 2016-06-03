import { Component, OnInit } from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import {
  Activity,
  ActivityService,
} from '../shared';

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

  activities: Activity[] = [];

  constructor(
    private activityService: ActivityService) {
  }

  ngOnInit() {
    // FIXME hardcoded activities
    console.log("got here");
    console.log(this.activities);
    this.activityService.getTodaysActivities().then(
      (activities) => {
        this.activities = activities;
        console.log(this);
      }
    );

  }




}
