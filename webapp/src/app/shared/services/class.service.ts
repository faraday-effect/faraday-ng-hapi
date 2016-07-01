import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Course, Person } from '../models';
import { CoursesUrl, SectionsUrl, StudentsUrl } from './constants';
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

interface Handler {
  (obj: any): any;
}

@Injectable()
export class ClassService {

  attendHandler: Handler;

  constructor(
    private nesService: NesService,
    private http: Http) { }

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

  subscribeToAttendance(id: number) {
    this.nesService.subscribe(`/sections/${id}/attendance`, this.attendHandler);
  }

  getStudents(id) {
    return this.http.get(SectionsUrl+`/${id}/relationships/1`) // 1 hardcoded to students FIXME
               .map(response => response.json())
               .catch(this.handleError);
  }

  handleAttend(handler: Handler) {
    this.attendHandler = handler;
  }

  attend(id: number, section_id: number, code: string) {
    let message = JSON.stringify({code: code});
    this.http.post(SectionsUrl+`/${section_id}/users/${id}/attendance`, message).subscribe();
  }

  leave(id: number, section_id: number) {
    this.http.delete(SectionsUrl+`/${section_id}/users/${id}/attendance`).subscribe();
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
