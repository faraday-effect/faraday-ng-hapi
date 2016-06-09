import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { ActivityDetailComponent } from './+activity-detail';
import { CueSheetComponent } from './+cue-sheet';
import { StoryBoardComponent } from './+story-board';

@Component({
  moduleId: module.id,
  selector: 'app-podium',
  templateUrl: 'podium.component.html',
  styleUrls: ['podium.component.css'],
  directives: [ROUTER_DIRECTIVES],
})
@Routes([
  {path: '/', component: CueSheetComponent},
  {path: '/activity-detail', component: ActivityDetailComponent},
  {path: '/cue-sheet', component: CueSheetComponent},
  {path: '/story-board', component: StoryBoardComponent},
])
export class PodiumComponent implements OnInit {

  debug = true;

  constructor() {}

  ngOnInit() {
  }

}
