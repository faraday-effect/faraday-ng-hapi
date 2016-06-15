import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Prefix, PrefixService } from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-prefix',
  templateUrl: 'prefix.component.html',
  styleUrls: ['prefix.component.css'],
  directives: []
})
export class PrefixComponent {

  prefix: Prefix;
  errorMessage: string;

  constructor(
    private prefixService: PrefixService) {
  }

  /*
  routerOnActivate(curr: RouteSegment) {
    let id = +curr.getParam('id');
    this.prefixService.getPrefix(id)
      .subscribe(
        prefix => this.prefix = prefix,
        error =>  this.errorMessage = <any>error
      );
  }
  */

}

