import { Component, OnInit } from '@angular/core';

import {
  ImportantDate,
  ImportantDateService,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-important-dates',
  templateUrl: 'important-dates.component.html',
  styleUrls: ['important-dates.component.css'],
  directives: [],
})
export class ImportantDatesComponent implements OnInit {

  importantDates: ImportantDate[] = [];

  constructor(
    private importantDateService: ImportantDateService){
  }

  ngOnInit() {
    // FIXME hardcoded activities
    this.importantDateService.getImportantDates().then(
      (importantDates) => {
        this.importantDates = importantDates;
      }
    );

  }


}
