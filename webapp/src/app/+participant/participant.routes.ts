import { RouterConfig } from '@angular/router';

import { ParticipantComponent } from './participant.component';
//import { QuizComponent } from 'app/shared';
import { QuizComponent } from '../shared/components/quiz/quiz.component';

export const ParticipantRoutes: RouterConfig = [
  {
    path: 'participant',
    component: ParticipantComponent,
    children: [
      { path: '', redirectTo: 'quiz', pathMatch: 'full' },
      { path: 'quiz', component: QuizComponent },
    ],
  },
];
