import { Component } from '@angular/core';
import { Router, Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';

import {
  CourseComponent,
  CoursesComponent,
  SectionComponent,
  SectionsComponent,
  SectionEditComponent,
  DepartmentComponent,
  DepartmentsComponent,
  PrefixComponent,
  PrefixesComponent,
  TermComponent,
  TermsComponent,
} from '../shared';

@Component({
  moduleId: module.id,
  // selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
  ],
})
@Routes([
  {path: '/', component: CoursesComponent},
  // {path: '/course/:id/edit', component: CourseEditComponent},
  {path: '/course/:id', component: CourseComponent},
  {path: '/course', component: CoursesComponent},
  {path: '/section/create', component: SectionEditComponent},
  {path: '/section/:id', component: SectionComponent},
  {path: '/section', component: SectionsComponent},
  {path: '/department/:id', component: DepartmentComponent},
  {path: '/department', component: DepartmentsComponent},
  {path: '/prefix/:id', component: PrefixComponent},
  {path: '/prefix', component: PrefixesComponent},
  {path: '/term', component: TermsComponent},
  {path: '/term/:id', component: TermComponent},
])
export class AdminComponent {

  constructor(
    private router: Router) {
  }

  gotoCourses() {
    this.router.navigate(['/admin/course']); // FIXME ADMIN
  }

  gotoSections() {
    this.router.navigate(['/admin/section']); // FIXME ADMIN
  }

  gotoDepartments() {
    this.router.navigate(['/admin/department']); // FIXME ADMIN
  }

  gotoPrefixes() {
    this.router.navigate(['/admin/prefix']); // FIXME ADMIN
  }

  gotoTerms() {
    this.router.navigate(['/admin/term']); // FIXME ADMIN
  }

  title = 'Admin Console';
}
