import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Section, ClassService } from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-section',
  templateUrl: 'section.component.html',
  styleUrls: ['section.component.css'],
})
export class SectionComponent {

  section: Section;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.classService.getSection(id)
        .subscribe(
          section => this.section = section,
          error =>  this.errorMessage = <any>error
        );
    });
  }

}

