import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { WelcomeComponent } from './+welcome';

@Component({
  moduleId: module.id,
  selector: 'app-projector',
  templateUrl: 'projector.component.html',
  styleUrls: ['projector.component.css'],
  directives: [ROUTER_DIRECTIVES],
})
@Routes([
  {path: '/', component: WelcomeComponent},
  {path: '/welcome', component: WelcomeComponent},
])
export class ProjectorComponent implements OnInit {

  debug = true;

  constructor() {}

  ngOnInit() {
  }

}
