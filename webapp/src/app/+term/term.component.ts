import { Component } from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

import { Term, TermService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-term',
  templateUrl: 'term.component.html',
  styleUrls: ['term.component.css'],
  directives: [MD_CARD_DIRECTIVES]
})
export class TermComponent implements OnActivate {

  term: Term;

  constructor(
    private termService: TermService) {
  }

  routerOnActivate(curr: RouteSegment) {
    let id = +curr.getParam('id');
    this.termService.getTerm(id)
      .then(term => this.term = term);
  }

}

