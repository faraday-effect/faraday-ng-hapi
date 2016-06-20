import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

import { Course, Person } from '../models';
import { CoursesUrl, SectionsUrl, StudentsUrl, AttendanceUrl } from './constants';
import { NesService } from './nes.service';

// MOCK
const SECTIONS: any[] = [
  {
    id: 1,
    course: {
      id: 1,
      prefix: 'COS',
      number: '121',
      title: 'Foundations of Comp Sci',
      active: true,
      department_id: 1,
    },
    term_id: 1,
    reg_number: '12345',
    title: 'Section 1'
  },
  {
    id: 2,
    course: {
      id: 2,
      prefix: 'COS',
      number: '243',
      title: 'Multi-Tier Web Applications',
      active: true,
      department_id: 1,
    },
    term_id: 1,
    reg_number: '54321',
    title: 'Section 2'
  },
];
const CLASS_CODE = '000000';

interface Handler {
  (ids: number[]): any;
}

@Injectable()
export class ClassService {

  attendHandler: Handler;
  departHandler: Handler;

  constructor(
    private nesService: NesService,
    private http: Http) {
      nesService.subscribe('/attendence', msg => {
        this.attendHandler([msg.student_id]);
      });
  }

  // courses

  getCourses() {
    return this.http.get(CoursesUrl)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getCourse(id: number) {
    return this.http.get(CoursesUrl+'/'+id)
      .map(response => response.json())
      .catch(this.handleError);
  }

  hideCourse(id: number) {
    return this.http.delete(CoursesUrl+'/'+id)
      .map(response => response.json())
      .catch(this.handleError);
  }

  // sections

  getSections() {
    return this.http.get(SectionsUrl)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getSection(id: number) {
    return this.http.get(SectionsUrl+'/'+id)
      .map(response => response.json())
      .catch(this.handleError);
  }
  // FIXME MOCK method
  getMockSections() {
    return Promise.resolve(SECTIONS);
  }

  // FIXME MOCK method
  getMockSection(id: number) {
    return Promise.resolve(SECTIONS[0]);
  }

  // attendance

  getStudents(id) {
    return this.http.get(SectionsUrl+`/${id}/students`)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  handleArrive(handler: Handler) {
    this.attendHandler = handler;
  }

  handleDepart(handler: Handler) {
    this.departHandler = handler;
  }

  attend(id: number, classId: number) {
    let message = JSON.stringify({
      student_id: id,
      actual_class_id: classId,
      code: CLASS_CODE,
    });
    this.http.post(AttendanceUrl, message)
        .toPromise().then(response => {
          response.json();
        });
  }

  depart(id: number, classId: number) {
    this.departHandler([id]);
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    console.log('ClassService: there is an error');
    console.log(error);
    return Observable.throw(errMsg);
  }

}
