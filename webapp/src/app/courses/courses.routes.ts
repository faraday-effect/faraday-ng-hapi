import { RouterConfig } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './course-detail';
import { PodiumComponent } from './podium';
import { ProjectorComponent } from './projector';
import { ParticipantComponent } from './participant';

export const CoursesRoutes: RouterConfig = [
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'courses/:id/podium', component: PodiumComponent },
  { path: 'courses/:id/projector', component: ProjectorComponent },
  { path: 'courses/:id/participant', component: ParticipantComponent },
];
