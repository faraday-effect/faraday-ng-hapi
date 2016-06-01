import { Component } from '@angular/core';
import { Router, Routes, ROUTER_DIRECTIVES , ROUTER_PROVIDERS} from '@angular/router';

import {
  // Services
  CourseService,
  SectionService,
  DepartmentService,
  PrefixService,
  TermService,
  // Components
  LoginComponent,
  AdminComponent,
  WelcomeComponent,
  // FIXME ADMIN: Router doesn't support nested routing yet
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
} from './shared';

@Component({
  moduleId: module.id,
  selector: 'faraday-app',
  templateUrl: 'faraday.component.html',
  styleUrls: ['faraday.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    CourseService,
    SectionService,
    DepartmentService,
    PrefixService,
    TermService,
  ]
})
@Routes([
  {path: '/', component: AdminComponent},
  {path: '/login', component: LoginComponent},
  {path: '/admin', component: AdminComponent},
  {path: '/welcome', component: WelcomeComponent},

  // FIXME ADMIN: Router doesn't support nested routing yet
  {path: '/admin/course/:id', component: CourseComponent},
  {path: '/admin/course', component: CoursesComponent},
  {path: '/admin/section/create', component: SectionEditComponent},
  {path: '/admin/section/:id', component: SectionComponent},
  {path: '/admin/section', component: SectionsComponent},
  {path: '/admin/department/:id', component: DepartmentComponent},
  {path: '/admin/department', component: DepartmentsComponent},
  {path: '/admin/prefix/:id', component: PrefixComponent},
  {path: '/admin/prefix', component: PrefixesComponent},
  {path: '/admin/term', component: TermsComponent},
  {path: '/admin/term/:id', component: TermComponent},
])
export class FaradayAppComponent {

  constructor(
    private router: Router) {
  }

}
