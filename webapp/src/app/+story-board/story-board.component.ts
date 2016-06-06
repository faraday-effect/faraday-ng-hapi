import { Component, OnInit} from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import {
  Section,
  SectionService,
  Activity,
  ActivityService,
} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-story-board',
  templateUrl: 'story-board.component.html',
  styleUrls: ['story-board.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ],
})
export class StoryBoardComponent implements OnInit {

  date: Date;
  section: Section;
  activities: Activity[] = [];

  constructor(
    private activityService: ActivityService,
    private sectionService: SectionService) {
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
    this.sectionService.getMockSections().then(
      (sections) => {
        this.section = sections[0];
        console.log(this);
      }
    );

  }


}
