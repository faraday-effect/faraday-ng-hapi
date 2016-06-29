import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
    private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.departmentService.getDepartment(id)
        .subscribe(
          department => this.department = department,
          error =>  this.errorMessage = <any>error
      );
    });
  }

}
