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
  PrefixService,
  PrefixComponent,
  PrefixesComponent,
  TermService,
  TermComponent,
  TermsComponent
} from './shared';
import { CourseEditComponent } from './+course-edit';

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
  providers: [
    ROUTER_PROVIDERS,
    CourseService,
    SectionService,
    DepartmentService,
    PrefixService,
    TermService,
  ]
})
@Routes([
  {path: '/', component: CoursesComponent},
  {path: '/course', component: CoursesComponent},
  {path: '/course/:id', component: CourseComponent},
  // {path: '/course/:id/edit', component: CourseEditComponent},
  {path: '/section', component: SectionsComponent},
  {path: '/section/:id', component: SectionComponent},
  {path: '/department', component: DepartmentsComponent},
  {path: '/department/:id', component: DepartmentComponent},
  {path: '/prefix', component: PrefixesComponent},
  {path: '/prefix/:id', component: PrefixComponent},
  {path: '/term/:id', component: TermComponent},
  {path: '/term', component: TermsComponent}
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

  gotoPrefixes() {
    this.router.navigate(['/prefix']);
  }

  gotoTerms() {
    this.router.navigate(['/term']);
  }

  title = 'faraday works!';
}
