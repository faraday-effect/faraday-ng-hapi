import { RouterConfig } from '@angular/router';

import { ClassesComponent } from './classes.component';
import { CourseDetailComponent } from './course-detail';
import { PodiumComponent } from './podium';
import { ProjectorComponent } from './projector';
import { ParticipantComponent } from './participant';

export const ClassesRoutes: RouterConfig = [
  { path: 'classes', component: ClassesComponent },
  { path: 'classes/:id', component: CourseDetailComponent },
  { path: 'classes/:id/podium', component: PodiumComponent },
  { path: 'classes/:id/projector', component: ProjectorComponent },
  { path: 'classes/:id/participant', component: ParticipantComponent },
];
