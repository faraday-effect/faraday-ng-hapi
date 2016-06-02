import { Component, OnInit} from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { ClassCodeComponent } from './class-code';

//import { TodaysTopicsComponent } from '../todays-topics';
import {
  TodaysTopicsComponent,
  ImportantDatesComponent,
  Course,
  CourseService,
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
    ClassCodeComponent,
  ],
})
export class WelcomeComponent implements OnInit {

  title = 'Welcome to ';
  date: Date;
  course: Course;

  constructor(
    private courseService: CourseService) {

  }

  ngOnInit() {
    this.date = new Date();
    // FIXME hardcoded course
    this.courseService.getCourses().then(
      (courses) => {
        this.course = courses[0];
        console.log(this.course);
      }
    );

  }

}
