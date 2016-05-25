import { Injectable } from '@angular/core';

import { Course } from './course';

var COURSES = [
  {
    id: 1,
    prefix: "COS",
    number: 120,
    title: "Introduction to Computational Problem Solving",
    active: false,
    department_id: 2,
  },
  {
    id: 2,
    prefix: "COS",
    number: 121,
    title: "C++ and Linux",
    active: false,
    department_id: 2,
  },
];

@Injectable()
export class CourseService {

  getCourses() {
    return Promise.resolve(COURSES);
  }

  getCourse(id: number) {
    return this.getCourses()
               .then(courses => courses.filter(course => course.id === id)[0]);
  }

}
