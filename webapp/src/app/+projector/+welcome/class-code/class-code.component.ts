import { Component, OnInit } from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import {
  Section,
  SectionService,
} from 'app/shared';


@Component({
  moduleId: module.id,
  selector: 'app-class-code',
  templateUrl: 'class-code.component.html',
  styleUrls: ['class-code.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ],
})
export class ClassCodeComponent implements OnInit {

  date: Date;
  section: Section;

  constructor(
    private sectionService: SectionService) {
  }

  ngOnInit() {
    this.date = new Date();
    // FIXME hardcoded section
    this.sectionService.getMockSections().then(
      (sections) => {
        this.section = sections[0];
        console.log(this.section);
      }
    );

  }

}
