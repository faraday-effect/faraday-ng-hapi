import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

//import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/map';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_CHECKBOX_DIRECTIVES } from '@angular2-material/checkbox';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

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
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_CHECKBOX_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ]
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  errorMessage: string;
  @Input() showHidden = false;

  constructor(
    private router: Router,
    private courseService: CourseService) {
  }

  ngOnInit() {
    console.log(this);
    this.courseService.getCourses()
        .subscribe(
          courses => this.courses = courses,
          error =>  this.errorMessage = <any>error
        );
  }

  gotoCourse(id: number) {
    this.router.navigate(['/admin/courses', id ]); // FIXME ADMIN
  }

}
