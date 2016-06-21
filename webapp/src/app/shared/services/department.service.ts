import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

//import { Department } from './shared';
import { DepartmentsUrl } from './constants';

@Injectable()
export class DepartmentService {

  constructor(private http: Http) { }

  getDepartments() {
    return this.http.get(DepartmentsUrl)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getDepartment(id: number) {
    return this.http.get(DepartmentsUrl+'/'+id)
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
