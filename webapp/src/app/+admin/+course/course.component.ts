import { Component } from '@angular/core';
import { OnActivate, RouteSegment, Router } from '@angular/router';

import { Course, ClassService } from 'app/shared';
import {MaterializeDirective} from "angular2-materialize";
declare var Materialize: any;
//import {Materialize} from 'materialize-css';

@Component({
  moduleId: module.id,
  selector: 'app-course',
  templateUrl: 'course.component.html',
  styleUrls: ['course.component.css'],
  directives: [
    MaterializeDirective, //required for dynamic behaviour of Materialize CSS that is using javascript
  ],
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
        //course => this.course = course,
        //error =>  this.errorMessage = <any>error
        (course) => {
          this.course = course;
        },
        (error) => {
          this.errorMessage = <any>error;
          Materialize.toast('There is an error: '+this.errorMessage, 4000);
        }
      );
  }

  hideCourse() {
    let id = +this.routeSegment.getParam('id');
    this.classService.hideCourse(id)
        .subscribe(() => this.router.navigate(['/admin/courses'])); // FIXME ADMIN
  }

}
