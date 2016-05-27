import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdButton } from '@angular2-material/button';

import {
  Course,
  CourseService,
  CourseComponent,
} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-courses',
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.css'],
  directives: [
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdButton,
  ]
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];

  constructor(
    private router: Router,
    private courseService: CourseService) {
  }

  ngOnInit() {
    this.courseService.getCourses()
        .then(courses => this.courses = courses);
  }

  gotoCourse(id: number) {
    this.router.navigate(['/course', id ]);
  }

}