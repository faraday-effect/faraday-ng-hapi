import { Component } from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

import { Department, DepartmentService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-department',
  templateUrl: 'department.component.html',
  styleUrls: ['department.component.css'],
  directives: [MD_CARD_DIRECTIVES]
})
export class DepartmentComponent implements OnActivate {

  department: Department;

  constructor(
    private departmentService: DepartmentService) {
  }

  routerOnActivate(curr: RouteSegment) {
    let id = +curr.getParam('id');
    this.departmentService.getDepartment(id)
      .then(department => this.department = department);
  }

}
