import { Component } from '@angular/core';
import { Router, Routes, ROUTER_DIRECTIVES , ROUTER_PROVIDERS} from '@angular/router';

import { MdIconRegistry } from '@angular2-material/icon';

import {
  // Services
  CourseService,
  SectionService,
  DepartmentService,
  PrefixService,
  TermService,
  AttendanceService,
  ActivityService,
  ImportantDateService,
  RegisterService,
  // Components
  LoginComponent,
  AdminComponent,
  WelcomeComponent,
  CueSheetComponent,
  LoginService,
  RegisterComponent,
} from './shared';

@Component({
  moduleId: module.id,
  selector: 'faraday-app',
  templateUrl: 'faraday.component.html',
  styleUrls: ['faraday.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    MdIconRegistry,
    CourseService,
    SectionService,
    DepartmentService,
    PrefixService,
    TermService,
    AttendanceService,
    LoginService,
    ActivityService,
    ImportantDateService,
    RegisterService,
  ]
})
@Routes([
  {path: '/', component: LoginComponent},
  {path: '/login', component: LoginComponent},
  {path: '/admin', component: AdminComponent},
  {path: '/welcome', component: WelcomeComponent},
  {path: '/cue-sheet', component: CueSheetComponent},
  {path: '/register', component: RegisterComponent},
])
export class FaradayAppComponent {

  debug = true;

  constructor(
    private router: Router) {
  }

}
