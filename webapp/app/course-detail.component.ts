import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Course } from './course';
import { CourseService } from './course.service';

@Component({
  selector: 'my-course-detail',
  template: `
    <div *ngIf="course">
      <h2>{{course.title}}</h2>
      <h3>{{course.prefix}} {{course.number}}</h3>
      Active: {{course.active}}
    </div>
  `,
})
export class CourseDetailComponent implements OnInit {

  course: Course;

  constructor(
    private routeParams: RouteParams,
    private courseService: CourseService) {
  }

  ngOnInit() {
    let id = +this.routeParams.get('id');
    this.courseService.getCourse(id)
        .then(course => this.course = course);
  }

}
