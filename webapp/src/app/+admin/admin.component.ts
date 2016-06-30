import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router) {
  }

  gotoCourses() {
    this.router.navigate(['courses'], {relativeTo: this.route});
  }

  gotoSections() {
    this.router.navigate(['sections'], {relativeTo: this.route});
  }

  gotoDepartments() {
    this.router.navigate(['departments'], {relativeTo: this.route});
  }

  gotoPrefixes() {
    this.router.navigate(['prefixes'], {relativeTo: this.route});
  }

  gotoTerms() {
    this.router.navigate(['terms'], {relativeTo: this.route});
  }

  gotoRegister() {
    this.router.navigate(['register'], {relativeTo: this.route});
  }

  title = 'Admin Console';
}
