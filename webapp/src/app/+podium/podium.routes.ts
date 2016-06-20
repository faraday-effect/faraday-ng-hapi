import { RouterConfig } from '@angular/router';

import { PodiumComponent } from './podium.component';
import { ActivityDetailComponent } from './+activity-detail';
import { CueSheetComponent } from './+cue-sheet';
import { StoryBoardComponent } from './+story-board';

export const PodiumRoutes: RouterConfig = [
  {
    path: 'podium',
    component: PodiumComponent,
    children: [
      { path: '', redirectTo: 'cue-sheet', terminal: true },
      { path: 'cue-sheet', component: CueSheetComponent },
      { path: 'activity-detail', component: ActivityDetailComponent },
      { path: 'story-board', component: StoryBoardComponent },
    ],
  },
];
