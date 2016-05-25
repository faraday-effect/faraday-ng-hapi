import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { CourseService } from './course.service';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './course-detail.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>test app</h1>
    <nav>
      <a [routerLink]="['Courses']">Courses</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    CourseService,
  ],
})
@RouteConfig([
  {
    path: '/courses',
    name: 'Courses',
    component: CoursesComponent,
    useAsDefault: true,
  },
  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: CourseDetailComponent,
  },
])
export class AppComponent {
}
