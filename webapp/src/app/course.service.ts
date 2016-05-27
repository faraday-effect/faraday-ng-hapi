import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Course } from './shared';

@Injectable()
export class CourseService {

  private coursesUrl = 'http://localhost:3000/course';  // URL to web api

  constructor(private http: Http) { }
  
  getCourses(): Promise<Course[]> {
    return this.http.get(this.coursesUrl)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  getCourse(id: number) {
    return this.http.get(this.coursesUrl+'/'+id)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  handleError(err: any) {
    console.error("CourseService", err);
  }

}