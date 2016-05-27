import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import {
  Term,
  TermService
} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-terms',
  templateUrl: 'terms.component.html',
  styleUrls: ['terms.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ]
})
export class TermsComponent implements OnInit {

  terms: Term[] = [];

  constructor(
    private router: Router,
    private termService: TermService) {
  }

  ngOnInit() {
    this.termService.getTerms()
      .then(terms => this.terms = terms);
  }

  gotoTerm(id: number) {
    this.router.navigate(['/term', id ]);
  }

}

