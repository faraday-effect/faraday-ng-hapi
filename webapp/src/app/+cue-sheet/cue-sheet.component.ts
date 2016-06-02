import { Component, OnInit } from '@angular/core';

import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';

import {
  Course,
  CourseService,
  TodaysTopicsComponent,
  ImportantDatesComponent,
} from '../shared';

import { AttendanceComponent } from './attendance';

@Component({
  moduleId: module.id,
  selector: 'app-cue-sheet',
  templateUrl: 'cue-sheet.component.html',
  styleUrls: ['cue-sheet.component.css'],
  directives: [
    MD_TOOLBAR_DIRECTIVES,
    AttendanceComponent,
    TodaysTopicsComponent,
    ImportantDatesComponent,
  ],
})
export class CueSheetComponent implements OnInit {

  course: Course;

  constructor(
    private courseService: CourseService) {
  }

  ngOnInit() {
    // FIXME hardcoded course
    this.courseService.getCourses().then(
      courses => this.course = courses[0]
    );
  }

}
