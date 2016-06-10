import { Component, OnInit } from '@angular/core';

import {
  Section,
  ClassService,
} from 'app/shared';


@Component({
  moduleId: module.id,
  selector: 'app-class-code',
  templateUrl: 'class-code.component.html',
  styleUrls: ['class-code.component.css'],
  directives: [],
})
export class ClassCodeComponent implements OnInit {

  date: Date;
  section: Section;

  constructor(
    private classService: ClassService) {
  }

  ngOnInit() {
    this.date = new Date();
    // FIXME hardcoded section
    this.classService.getMockSections().then(
      (sections) => {
        this.section = sections[0];
        console.log(this.section);
      }
    );

  }

}
