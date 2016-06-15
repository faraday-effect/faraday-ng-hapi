import { provideRouter, RouterConfig } from '@angular/router';

import { AdminRoutes } from './+admin/admin.routes';
import { ParticipantRoutes } from './+participant/participant.routes';
import { PodiumRoutes } from './+podium/podium.routes';
import { ProjectorRoutes } from './+projector/projector.routes';

import { LoginComponent } from './+login';

const routes: RouterConfig = [
  {
    path: '/login',
    component: LoginComponent,
    index: true,
  },
  ...AdminRoutes,
  ...ParticipantRoutes,
  ...PodiumRoutes,
  ...ProjectorRoutes,
];

export const FARADAY_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
