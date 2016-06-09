import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Course } from '../models';

@Injectable()
export class CourseService {

  private coursesUrl = 'http://localhost:3000/courses';  // URL to web api

  constructor(private http: Http) { }

  getCourses(): Observable<Course[]> {
    return this.http.get(this.coursesUrl)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getCourse(id: number) {
    return this.http.get(this.coursesUrl+'/'+id)
      .map(response => response.json())
      .catch(this.handleError);
  }

  hideCourse(id: number) {
    return this.http.delete(this.coursesUrl+'/'+id)
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
