import { RouterConfig } from '@angular/router';

import { ParticipantComponent } from './participant.component';
//import { QuizComponent } from 'app/shared';
import { QuizComponent } from '../shared/components/quiz/quiz.component';

export const ParticipantRoutes: RouterConfig = [
  {
    path: 'participant',
    component: ParticipantComponent,
    children: [
      { path: '', redirectTo: 'quiz', terminal: true },
      { path: 'quiz', component: QuizComponent },
    ],
  },
];
