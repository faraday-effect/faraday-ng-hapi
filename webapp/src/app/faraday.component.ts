import { Component } from '@angular/core';
import { Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdButton } from '@angular2-material/button';
import { MdToolbar } from '@angular2-material/toolbar';

import {
  CourseService,
  CourseComponent,
  CoursesComponent,
} from './shared';

@Component({
  moduleId: module.id,
  selector: 'faraday-app',
  templateUrl: 'faraday.component.html',
  styleUrls: ['faraday.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdButton,
    MdToolbar,
  ],
  providers: [ROUTER_PROVIDERS, CourseService]
})
@Routes([
  {path: '/course/:id', component: CourseComponent},
  {path: '/course', component: CoursesComponent},
  {path: '/', component: CoursesComponent}
])
export class FaradayAppComponent {

  constructor(
    private router: Router) {
  }

  gotoCourses() {
    this.router.navigate(['/course']);
  }

  title = 'faraday works!';
}
