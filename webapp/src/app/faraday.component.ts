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
  CueSheetComponent,
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
  {path: '/cue-sheet', component: CueSheetComponent}
])
export class FaradayAppComponent {

  constructor(
    private router: Router) {
  }

}
