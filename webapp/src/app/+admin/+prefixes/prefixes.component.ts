import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import {
  Prefix,
  PrefixService,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-prefixes',
  templateUrl: 'prefixes.component.html',
  styleUrls: ['prefixes.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ]
})
export class PrefixesComponent implements OnInit {

  prefixes: Prefix[] = [];
  errorMessage: string;

  constructor(
    private router: Router,
    private prefixService: PrefixService) {
  }

  ngOnInit() {
    this.prefixService.getPrefixes()
      .subscribe(
        prefixes => this.prefixes = prefixes,
        error =>  this.errorMessage = <any>error
      );
  }

  gotoPrefix(id: number) {
    this.router.navigate(['/admin/prefixes', id ]); // FIXME ADMIN
  }

}
