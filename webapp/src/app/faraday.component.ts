import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ToolbarComponent } from './toolbar';
import * as ServicesModule from 'app/shared/services';

let Services = Object.keys(ServicesModule).map(k => ServicesModule[k]);

@Component({
  moduleId: module.id,
  selector: 'faraday-app',
  templateUrl: 'faraday.component.html',
  styleUrls: ['faraday.component.css'],
  directives: [ROUTER_DIRECTIVES, ToolbarComponent],
  providers: [
    Services,
  ]
})
export class FaradayAppComponent {

  debug = true;

  constructor() {}

}
