import { Component, OnInit } from '@angular/core';

import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';

import {
  Section,
  SectionService,
  Course,
  CourseService,
  TodaysTopicsComponent,
  ImportantDatesComponent,
} from '../shared';

import { AttendanceComponent } from './attendance';

@Component({
  moduleId: module.id,
  selector: 'app-cue-sheet',
  templateUrl: 'cue-sheet.component.html',
  styleUrls: ['cue-sheet.component.css'],
  directives: [
    MD_TOOLBAR_DIRECTIVES,
    AttendanceComponent,
    TodaysTopicsComponent,
    ImportantDatesComponent,
  ],
})
export class CueSheetComponent implements OnInit {

  section: Section;

  constructor(
    private sectionService: SectionService) {
  }

  ngOnInit() {
    // FIXME hardcoded section
    this.sectionService.getMockSections().then(
      sections => this.section = sections[0]
    );
  }

}
