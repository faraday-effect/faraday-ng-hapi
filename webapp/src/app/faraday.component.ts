import { Component } from '@angular/core';
import { CourseComponent } from './+course';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { CoursesComponent } from './+courses';
import { SectionComponent } from './+section';

import { CourseService } from './shared';
import { SectionService } from './shared';

@Component({
  moduleId: module.id,
  selector: 'faraday-app',
  templateUrl: 'faraday.component.html',
  styleUrls: ['faraday.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, CourseService, SectionService]
})
@Routes([
  {path: '/course/:id', component: CourseComponent},
  // {path: '/courses', component: CoursesComponent},
  // {path: '/', component: CoursesComponent},
  {path: '/section/:id', component: SectionComponent}
])
export class FaradayAppComponent {
  title = 'faraday works!';
}
