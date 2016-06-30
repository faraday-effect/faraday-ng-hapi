import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import {
  ToolbarConfigService,
  UserService,
} from 'app/shared';

import { routes } from '../faraday.routes';

@Component({
  moduleId: module.id,
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
  directives: [ROUTER_DIRECTIVES],
})
export class ToolbarComponent implements OnInit {

  debug = false;
  routes = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private config: ToolbarConfigService) {}

  ngOnInit() {
    this.routes = routes;
  }

  logout() {
    this.userService.logout().subscribe(
      () => this.router.navigate(['/login'])
    );
  }

}
