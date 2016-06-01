import { Component } from '@angular/core';
import { Router, Routes, ROUTER_DIRECTIVES } from '@angular/router';

import {
  CourseService,
  SectionService,
  DepartmentService,
  PrefixService,
  TermService,
} from './shared';
import { LoginComponent } from './+login';
import { AdminComponent } from './+admin';

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
])
export class FaradayAppComponent {

  constructor(
    private router: Router) {
  }

}
