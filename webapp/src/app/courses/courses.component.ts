import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { CourseService } from './course.service';

@Component({
  moduleId: module.id,
  selector: 'app-courses',
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [CourseService],
})
export class CoursesComponent implements OnInit {

  courses: Observable<any>;
  allCourses: Observable<any>;
  enrolled = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService) {}

  ngOnInit() {
    this.courses = this.courseService.getCourses();
    this.allCourses = this.courseService.getMockAllCourses();
    this.courses.subscribe(courses => {
      this.enrolled = {};
      for (let c of courses) {
        this.enrolled[c.id] = true;
      }
    });
  }

  attend(id: number) {
    console.log(`Attending ${id}!`);
    this.router.navigate([id, 'participant'], {relativeTo: this.route});
  }

  canAttend(id: number) {
    return id != 25;
  }

  enroll(id: number) {
    console.log(`Enrolling in ${id}!`);
    this.courses.retry().delay(1000);
  }

  canEnroll(id: number) {
    return !this.enrolled[id];
  }

}
