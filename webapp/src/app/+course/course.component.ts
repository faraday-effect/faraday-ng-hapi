import { Component } from '@angular/core';
import { OnActivate, RouteSegment, Router } from '@angular/router';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

import { Course, CourseService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-course',
  templateUrl: 'course.component.html',
  styleUrls: ['course.component.css'],
  directives: [MD_CARD_DIRECTIVES]
})
export class CourseComponent implements OnActivate {

  course: Course;
  routeSegment: RouteSegment;

  constructor(
    private router: Router,
    private courseService: CourseService) {
  }

  routerOnActivate(curr: RouteSegment) {
    this.routeSegment = curr;
    let id = +curr.getParam('id');
    this.courseService.getCourse(id)
        .then(course => this.course = course);
  }

  deactivateCourse() {
    let id = +this.routeSegment.getParam('id');
    this.courseService.deleteCourse(id)
        .then(() => this.router.navigate(['/admin/courses'])); // FIXME ADMIN
  }

}
