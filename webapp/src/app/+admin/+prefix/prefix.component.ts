import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
    private prefixService: PrefixService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.prefixService.getPrefix(id)
        .subscribe(
          prefix => this.prefix = prefix,
          error =>  this.errorMessage = <any>error
        );
    });
  }

}

