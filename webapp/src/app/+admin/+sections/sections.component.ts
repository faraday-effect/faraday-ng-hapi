import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Section,
  ClassService,
} from 'app/shared';
import { SectionComponent } from '../+section';

@Component({
  moduleId: module.id,
  selector: 'app-sections',
  templateUrl: 'sections.component.html',
  styleUrls: ['sections.component.css'],
  directives: []
})
export class SectionsComponent implements OnInit {

  sections: Section[] = [];
  errorMessage: string;

  constructor(
    private router: Router,
    private classService: ClassService) {
  }

  ngOnInit() {
    this.classService.getSections()
      .subscribe(
        sections => this.sections = sections,
        error =>  this.errorMessage = <any>error
      );
  }

  gotoSection(id: number) {
    this.router.navigate(['/admin/sections', id ]); // FIXME admin
  }

  createSection() {
  }

}
