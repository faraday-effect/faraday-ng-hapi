import { Component } from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';

import { Section, SectionService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-section',
  templateUrl: 'section.component.html',
  styleUrls: ['section.component.css'],
})
export class SectionComponent implements OnActivate {

  section: Section;

  constructor(
    private sectionService: SectionService) {
  }

  routerOnActivate(curr: RouteSegment) {
   let id = +curr.getParam('id');
   this.sectionService.getSection(id)
     .then(section => this.section = section);
  }

}

