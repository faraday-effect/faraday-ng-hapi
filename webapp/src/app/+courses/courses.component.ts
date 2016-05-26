import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Course, CourseService, CourseComponent } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-courses',
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.css']
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
