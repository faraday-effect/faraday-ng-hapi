import { Component } from '@angular/core';
import { Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';

import {
  CourseService,
  CourseComponent,
  CoursesComponent,
  SectionService,
  SectionComponent,
  SectionsComponent,
  DepartmentService,
  DepartmentComponent,
  DepartmentsComponent,
} from './shared';

@Component({
  moduleId: module.id,
  selector: 'faraday-app',
  templateUrl: 'faraday.component.html',
  styleUrls: ['faraday.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
  ],
  providers: [ROUTER_PROVIDERS, CourseService, SectionService, DepartmentService]
})
@Routes([
  {path: '/course/:id/...', component: CourseComponent},
  {path: '/course', component: CoursesComponent},
  {path: '/', component: CoursesComponent},
  {path: '/section/:id', component: SectionComponent},
  {path: '/section', component: SectionsComponent},
  {path: '/department/:id', component: DepartmentComponent},
  {path: '/department', component: DepartmentsComponent}
])
export class FaradayAppComponent {

  constructor(
    private router: Router) {
  }

  gotoCourses() {
    this.router.navigate(['/course']);
  }

  gotoSections() {
    this.router.navigate(['/section']);
  }

  gotoDepartments() {
    this.router.navigate(['/department']);
  }

  title = 'faraday works!';
}
