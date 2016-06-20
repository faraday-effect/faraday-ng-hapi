import { Component, OnInit } from '@angular/core';

import {
  Section,
  Course,
  ClassService,
  TodaysTopicsComponent,
  ImportantDatesComponent,
} from 'app/shared';

import { AttendanceComponent } from './attendance';

@Component({
  moduleId: module.id,
  selector: 'app-cue-sheet',
  templateUrl: 'cue-sheet.component.html',
  styleUrls: ['cue-sheet.component.css'],
  directives: [
    AttendanceComponent,
    TodaysTopicsComponent,
    ImportantDatesComponent,
  ],
})
export class CueSheetComponent implements OnInit {

  section: Section;

  constructor(
    private classService: ClassService) {
  }

  ngOnInit() {
    // FIXME hardcoded section
    this.classService.getMockSections().then(
      sections => this.section = sections[0]
    );
  }

}
