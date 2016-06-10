import { Component } from '@angular/core';
import { OnActivate, RouteSegment, Router } from '@angular/router';

import { Course, ClassService } from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-course',
  templateUrl: 'course.component.html',
  styleUrls: ['course.component.css'],
  directives: []
})
export class CourseComponent implements OnActivate {

  course: Course;
  routeSegment: RouteSegment;
  errorMessage: string;

  constructor(
    private router: Router,
    private classService: ClassService) {
  }

  routerOnActivate(curr: RouteSegment) {
    this.routeSegment = curr;
    let id = +curr.getParam('id');
    this.classService.getCourse(id)
      .subscribe(
        course => this.course = course,
        error =>  this.errorMessage = <any>error
      );
  }

  hideCourse() {
    let id = +this.routeSegment.getParam('id');
    this.classService.hideCourse(id)
        .subscribe(() => this.router.navigate(['/admin/courses'])); // FIXME ADMIN
  }

}
