import { provideRouter, RouterConfig } from '@angular/router';

import { AdminRoutes } from './+admin/admin.routes';
import { ParticipantRoutes } from './+participant/participant.routes';
import { PodiumRoutes } from './+podium/podium.routes';
import { ProjectorRoutes } from './+projector/projector.routes';
import { ClassesRoutes } from './classes/classes.routes';

import { LoginComponent } from './+login';

const routes: RouterConfig = [
  { path: '', redirectTo: 'login', terminal: true },
  { path: 'login', component: LoginComponent },
  ...AdminRoutes,
  ...ParticipantRoutes,
  ...PodiumRoutes,
  ...ProjectorRoutes,
  ...ClassesRoutes,
];

export const FARADAY_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
