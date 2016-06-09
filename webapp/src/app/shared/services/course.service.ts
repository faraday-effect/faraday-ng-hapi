import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Course } from '../models';
import { CoursesUrl } from './constants';

@Injectable()
export class CourseService {

  constructor(private http: Http) { }

  getCourses(): Observable<Course[]> {
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

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    console.log('CourseService: there is an error');
    console.log(error);
    return Observable.throw(errMsg);
  }

}
