import { Component } from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';

import { Term, TermService } from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-term',
  templateUrl: 'term.component.html',
  styleUrls: ['term.component.css'],
  directives: []
})
export class TermComponent implements OnActivate {

  term: Term;
  errorMessage: string;

  constructor(
    private termService: TermService) {
  }

  routerOnActivate(curr: RouteSegment) {
    let id = +curr.getParam('id');
    this.termService.getTerm(id)
      .subscribe(
        term => this.term = term,
        error =>  this.errorMessage = <any>error
      );
  }

}

