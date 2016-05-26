import { Component } from '@angular/core';
import { CourseComponent } from './+course';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { CoursesComponent } from './+courses';

import { CourseService } from './shared';

@Component({
  moduleId: module.id,
  selector: 'faraday-app',
  templateUrl: 'faraday.component.html',
  styleUrls: ['faraday.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, CourseService]
})
@Routes([
  {path: '/course/:id', component: CourseComponent},
  {path: '/courses', component: CoursesComponent},
  {path: '*', component: CoursesComponent}
])
export class FaradayAppComponent {
  title = 'faraday works!';
}
