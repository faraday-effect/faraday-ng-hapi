import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {
  Section,
  Activity,
  ClassService,
  ActivityService,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-activity-detail',
  templateUrl: 'activity-detail.component.html',
  styleUrls: ['activity-detail.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
  ],
})
export class ActivityDetailComponent implements OnInit {

  date: Date;
  section: Section;
  activity: Activity;

  constructor(
    private activityService: ActivityService,
    private classService: ClassService) {
  }

  ngOnInit() {
    this.date = new Date();
    // FIXME hardcoded activities
    this.activityService.getTodaysActivities().then(
      (activities) => {
        this.activity = activities[0];
        console.log(this);
      }
    );
    // FIXME hardcoded course
    this.classService.getMockSections().then(
      (sections) => {
        this.section = sections[0];
        console.log(this);
      }
    );

  }


}

