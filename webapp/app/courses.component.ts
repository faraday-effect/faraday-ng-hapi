import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Course } from './course';
import { CourseService } from './course.service';
import { CourseDetailComponent} from './course-detail.component';

@Component({
  selector: 'my-courses',
  template: `
    <ul>
      <li *ngFor="let course of courses"
          (click)="gotoCourse(course.id)">
        <span>{{course.title}}</span>
      </li>
    </ul>
  `,
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
    this.router.navigate(['CourseDetail', { id: id }]);
  }
}
