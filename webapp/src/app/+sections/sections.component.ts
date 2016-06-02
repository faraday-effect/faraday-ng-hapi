import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdButton } from '@angular2-material/button';

import {
  Section,
  SectionService,
  SectionComponent,
} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-sections',
  templateUrl: 'sections.component.html',
  styleUrls: ['sections.component.css'],
  directives: [
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdButton,
  ]
})
export class SectionsComponent implements OnInit {

  sections: Section[] = [];

  constructor(
    private router: Router,
    private sectionService: SectionService) {
  }

  ngOnInit() {
    this.sectionService.getSections()
      .then(sections => this.sections = sections);
  }

  gotoSection(id: number) {
    this.router.navigate(['/admin/sections', id ]); // FIXME admin
  }

  createSection() {
  }

}
