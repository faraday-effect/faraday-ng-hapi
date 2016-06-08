import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

//import { Department } from './shared';

@Injectable()
export class DepartmentService {

  private departmentsUrl = 'http://localhost:3000/departments';  // URL to web api

  constructor(private http: Http) { }

  getDepartments() {
    return this.http.get(this.departmentsUrl)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getDepartment(id: number) {
    return this.http.get(this.departmentsUrl+'/'+id)
      .map(response => response.json())
      .catch(this.handleError);
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    console.log('DepartmentService: there is an error');
    console.log(error);
    return Observable.throw(errMsg);
  }

}
