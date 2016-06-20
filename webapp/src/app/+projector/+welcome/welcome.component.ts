import { Component, OnInit} from '@angular/core';

import {MaterializeDirective} from "angular2-materialize";

import { ClassCodeComponent } from './class-code';



import {
  TodaysTopicsComponent,
  ImportantDatesComponent,
  Section,
  ClassService,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
  directives: [
    TodaysTopicsComponent,
    ImportantDatesComponent,
    ClassCodeComponent,
    MaterializeDirective,
  ],
})
export class WelcomeComponent implements OnInit {

  date: Date;
  section: Section;

  constructor(
    private classService: ClassService) {

  }

  ngOnInit() {
    this.date = new Date();
    // FIXME hardcoded course
    this.classService.getMockSections().then(
      (sections) => {
        this.section = sections[0];
        console.log(this);
      }
    );

  }

}
