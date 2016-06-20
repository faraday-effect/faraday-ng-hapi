import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Department,
  DepartmentService,
//  DepartmentComponent,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-departments',
  templateUrl: 'departments.component.html',
  styleUrls: ['departments.component.css'],
  directives: []
})
export class DepartmentsComponent implements OnInit {

  departments: Department[] = [];
  errorMessage: string;

  constructor(
    private router: Router,
    private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.departmentService.getDepartments()
      .subscribe(
        departments => this.departments = departments,
        error =>  this.errorMessage = <any>error
      );
  }

  gotoDepartment(id: number) {
    this.router.navigate(['/admin/departments', id ]); // FIXME ADMIN
  }

}

