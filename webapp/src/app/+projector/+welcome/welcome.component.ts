import { Component, OnInit} from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { ClassCodeComponent } from './class-code';

import {
  TodaysTopicsComponent,
  ImportantDatesComponent,
  Section,
  SectionService,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    TodaysTopicsComponent,
    ImportantDatesComponent,
    ClassCodeComponent,
  ],
})
export class WelcomeComponent implements OnInit {
  
  date: Date;
  section: Section;

  constructor(
    private sectionService: SectionService) {

  }

  ngOnInit() {
    this.date = new Date();
    // FIXME hardcoded course
    this.sectionService.getMockSections().then(
      (sections) => {
        this.section = sections[0];
        console.log(this);
      }
    );

  }

}
