import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
export class CourseComponent implements OnInit {

  course: Course;
  errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classService: ClassService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.classService.getCourse(id)
          .subscribe(
            course => this.course = course,
            error => {
              this.errorMessage = <any>error;
              Materialize.toast('There is an error: '+this.errorMessage, 4000);
            }
          );
    });
  }

  /*
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
  */

}
