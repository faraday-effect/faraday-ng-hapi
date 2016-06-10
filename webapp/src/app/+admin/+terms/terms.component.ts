import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Term,
  TermService
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-terms',
  templateUrl: 'terms.component.html',
  styleUrls: ['terms.component.css'],
  directives: []
})
export class TermsComponent implements OnInit {

  terms: Term[] = [];
  errorMessage: string;

  constructor(
    private router: Router,
    private termService: TermService) {
  }

  ngOnInit() {
    this.termService.getTerms()
      .subscribe(
        terms => this.terms = terms,
        error =>  this.errorMessage = <any>error
      );
  }

  gotoTerm(id: number) {
    this.router.navigate(['/admin/terms', id ]); // FIXME ADMIN
  }

}

