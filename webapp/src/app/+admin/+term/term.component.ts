import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Term, TermService } from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-term',
  templateUrl: 'term.component.html',
  styleUrls: ['term.component.css'],
  directives: []
})
export class TermComponent {

  term: Term;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private termService: TermService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.termService.getTerm(id)
        .subscribe(
          term => this.term = term,
          error =>  this.errorMessage = <any>error
        );
    });
  }

}

