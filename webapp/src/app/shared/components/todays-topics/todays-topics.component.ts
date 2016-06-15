import { Component, OnInit } from '@angular/core';

import {
  Activity,
  ActivityService,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-todays-topics',
  templateUrl: 'todays-topics.component.html',
  styleUrls: ['todays-topics.component.css'],
  directives: [],
})
export class TodaysTopicsComponent implements OnInit {

  activities: Activity[] = [];

  constructor(
    private activityService: ActivityService) {
  }

  ngOnInit() {
    // FIXME hardcoded activities
    this.activityService.getTodaysActivities().then(
      (activities) => {
        this.activities = activities;
      }
    );

  }




}
