import { ProjectorComponent } from './projector.component';
import { WelcomeComponent } from './+welcome';

export const ProjectorRoutes = [
  {
    path: '/projector',
    component: ProjectorComponent,
    children: [
      {
        path: '/welcome',
        component: WelcomeComponent,
        index: true,
      },
    ],
  },
];
