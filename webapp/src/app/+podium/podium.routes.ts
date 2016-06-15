import { PodiumComponent } from './podium.component';
import { ActivityDetailComponent } from './+activity-detail';
import { CueSheetComponent } from './+cue-sheet';
import { StoryBoardComponent } from './+story-board';

export const PodiumRoutes = [
  {
    path: '/podium',
    component: PodiumComponent,
    children: [
      {
        path: '/cue-sheet',
        component: CueSheetComponent,
        index: true,
      },
      {
        path: '/activity-detail',
        component: ActivityDetailComponent,
      },
      {
        path: '/story-board',
        component: StoryBoardComponent,
      },
    ],
  },
];
