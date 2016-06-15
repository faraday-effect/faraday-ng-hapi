import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Department, DepartmentService } from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-department',
  templateUrl: 'department.component.html',
  styleUrls: ['department.component.css'],
  directives: []
})
export class DepartmentComponent {

  department: Department;
  errorMessage: string;

  constructor(
    private departmentService: DepartmentService) {
  }

  /*
  routerOnActivate(curr: RouteSegment) {
    let id = +curr.getParam('id');
    this.departmentService.getDepartment(id)
      .subscribe(
        department => this.department = department,
        error =>  this.errorMessage = <any>error
      );
  }
  */

}
