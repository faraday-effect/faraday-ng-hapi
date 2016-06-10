import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {
  Section,
  Activity,
  ClassService,
  ActivityService,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-story-board',
  templateUrl: 'story-board.component.html',
  styleUrls: ['story-board.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
  ],
})
export class StoryBoardComponent implements OnInit {

  date: Date;
  section: Section;
  activities: Activity[] = [];

  constructor(
    private activityService: ActivityService,
    private classService: ClassService) {
  }

  ngOnInit() {
    this.date = new Date();
    // FIXME hardcoded activities
    console.log("got here");
    console.log(this.activities);
    this.activityService.getTodaysActivities().then(
      (activities) => {
        this.activities = activities;
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
