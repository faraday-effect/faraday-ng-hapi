import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

//import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/map';


import {
  Course,
  ClassService,
} from 'app/shared';
import { CourseComponent } from '../+course';

@Component({
  moduleId: module.id,
  selector: 'app-courses',
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.css'],
  directives: []
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  errorMessage: string;
  showHidden = false;

  constructor(
    private router: Router,
    private classService: ClassService) {
  }

  ngOnInit() {
    console.log(this);
    this.classService.getCourses()
        .subscribe(
          courses => this.courses = courses,
          error =>  this.errorMessage = <any>error
        );
  }

  gotoCourse(id: number) {
    this.router.navigate(['/admin/courses', id ]); // FIXME ADMIN
  }

}
