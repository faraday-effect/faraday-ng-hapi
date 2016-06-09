import { Component, OnInit } from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import {
  ImportantDate,
  ImportantDateService,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-important-dates',
  templateUrl: 'important-dates.component.html',
  styleUrls: ['important-dates.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ],
})
export class ImportantDatesComponent implements OnInit {

  importantDates: ImportantDate[] = [];

  constructor(
    private importantDateService: ImportantDateService){
  }

  ngOnInit() {
    // FIXME hardcoded activities
    console.log("got here");
    console.log(this.importantDateService);
    this.importantDateService.getImportantDates().then(
      (importantDates) => {
        this.importantDates = importantDates;
        console.log(this);
      }
    );

  }


}
