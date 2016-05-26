import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Department } from './shared';

@Injectable()
export class DepartmentService {

  private departmentsUrl = 'http://localhost:3000/department';  // URL to web api

  constructor(private http: Http) { }

  getDepartments(): Promise<Department[]> {
    return this.http.get(this.departmentsUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getDepartment(id: number) {
    return this.http.get(this.departmentsUrl+'/'+id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  handleError(err: any) {
    console.error("DepartmentService", err);
  }

}
