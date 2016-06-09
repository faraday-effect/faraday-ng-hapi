import { Component } from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';

import { Section, ClassService } from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-section',
  templateUrl: 'section.component.html',
  styleUrls: ['section.component.css'],
})
export class SectionComponent implements OnActivate {

  section: Section;
  errorMessage: string;

  constructor(
    private classService: ClassService) {
  }

  routerOnActivate(curr: RouteSegment) {
   let id = +curr.getParam('id');
   this.classService.getSection(id)
     .subscribe(
       section => this.section = section,
       error =>  this.errorMessage = <any>error
     );
  }

}

