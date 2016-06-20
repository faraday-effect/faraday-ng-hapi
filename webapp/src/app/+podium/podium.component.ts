import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

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
export class PodiumComponent implements OnInit {

  debug = true;

  constructor() {}

  ngOnInit() {
  }

}
