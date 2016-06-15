import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { CourseComponent } from './+course';
import { CoursesComponent } from './+courses';
import { SectionComponent } from './+section';
import { SectionsComponent } from './+sections';
import { DepartmentComponent } from './+department';
import { DepartmentsComponent } from './+departments';
import { PrefixComponent } from './+prefix';
import { PrefixesComponent } from './+prefixes';
import { TermComponent } from './+term';
import { TermsComponent } from './+terms';
import { RegisterComponent } from './+register';

@Component({
  moduleId: module.id,
  // selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
  ],
})
export class AdminComponent {

  constructor(
    private router: Router) {
  }

  gotoCourses() {
    this.router.navigate(['/admin/courses']); // FIXME ADMIN
  }

  gotoSections() {
    this.router.navigate(['/admin/sections']); // FIXME ADMIN
  }

  gotoDepartments() {
    this.router.navigate(['/admin/departments']); // FIXME ADMIN
  }

  gotoPrefixes() {
    this.router.navigate(['/admin/prefixes']); // FIXME ADMIN
  }

  gotoTerms() {
    this.router.navigate(['/admin/terms']); // FIXME ADMIN
  }

  gotoRegister() {
    this.router.navigate(['/admin/register']); // FIXME ADMIN
  }

  title = 'Admin Console';
}
