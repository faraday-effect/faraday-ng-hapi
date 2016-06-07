import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import {
  Department,
  DepartmentService,
//  DepartmentComponent,
} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-departments',
  templateUrl: 'departments.component.html',
  styleUrls: ['departments.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ]
})
export class DepartmentsComponent implements OnInit {

  departments: Department[] = [];

  constructor(
    private router: Router,
    private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.departmentService.getDepartments()
      .then(departments => this.departments = departments);
  }

  gotoDepartment(id: number) {
    this.router.navigate(['/admin/departments', id ]); // FIXME ADMIN
  }

}
