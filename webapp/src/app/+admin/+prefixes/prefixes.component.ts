import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Prefix,
  PrefixService,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-prefixes',
  templateUrl: 'prefixes.component.html',
  styleUrls: ['prefixes.component.css'],
  directives: []
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
