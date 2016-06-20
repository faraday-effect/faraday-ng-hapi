import { RouterConfig } from '@angular/router';

import { ProjectorComponent } from './projector.component';
import { WelcomeComponent } from './+welcome';

export const ProjectorRoutes: RouterConfig = [
  {
    path: 'projector',
    component: ProjectorComponent,
    children: [
      { path: '', redirectTo: 'welcome' },
      { path: 'welcome', component: WelcomeComponent },
    ],
  },
];
