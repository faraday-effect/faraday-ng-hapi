import { Component, OnInit } from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import {
  Section,
  Activity,
  SectionService,
  ActivityService,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-activity-detail',
  templateUrl: 'activity-detail.component.html',
  styleUrls: ['activity-detail.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ],
})
export class ActivityDetailComponent implements OnInit {

  date: Date;
  section: Section;
  activity: Activity;

  constructor(
    private activityService: ActivityService,
    private sectionService: SectionService) {
  }

  ngOnInit() {
    this.date = new Date();
    // FIXME hardcoded activities
    console.log("got here");
    this.activityService.getTodaysActivities().then(
      (activities) => {
        this.activity = activities[0];
        console.log(this);
      }
    );
    // FIXME hardcoded course
    this.sectionService.getMockSections().then(
      (sections) => {
        this.section = sections[0];
        console.log(this);
      }
    );

  }


}

