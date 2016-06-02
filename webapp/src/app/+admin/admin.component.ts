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
  {path: '/courses/:id', component: CourseComponent},
  {path: '/courses', component: CoursesComponent},
  {path: '/sections/create', component: SectionEditComponent},
  {path: '/sections/:id', component: SectionComponent},
  {path: '/sections', component: SectionsComponent},
  {path: '/departments/:id', component: DepartmentComponent},
  {path: '/departments', component: DepartmentsComponent},
  {path: '/prefixes/:id', component: PrefixComponent},
  {path: '/prefixes', component: PrefixesComponent},
  {path: '/terms/:id', component: TermComponent},
  {path: '/terms', component: TermsComponent},
])
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

  title = 'Admin Console';
}
