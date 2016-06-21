import { provideRouter, RouterConfig } from '@angular/router';

import { AdminRoutes } from './+admin/admin.routes';
import { ParticipantRoutes } from './+participant/participant.routes';
import { PodiumRoutes } from './+podium/podium.routes';
import { ProjectorRoutes } from './+projector/projector.routes';
import { CoursesRoutes } from './courses/courses.routes';

import { LoginComponent } from './+login';

export const routes: RouterConfig = [
  { path: '', redirectTo: 'login', terminal: true },
  { path: 'login', component: LoginComponent },
  ...AdminRoutes,
  ...ParticipantRoutes,
  ...PodiumRoutes,
  ...ProjectorRoutes,
  ...CoursesRoutes,
];

export const FARADAY_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
