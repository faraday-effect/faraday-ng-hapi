import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { MdIconRegistry } from '@angular2-material/icon';

import { LoginComponent } from './+login';
import { AdminComponent } from './+admin';
import { ParticipantComponent } from './+participant';
import { PodiumComponent } from './+podium';
import { ProjectorComponent } from './+projector';
import * as ServicesModule from 'app/shared/services';

let Services = Object.keys(ServicesModule).map(k => ServicesModule[k]);

@Component({
  moduleId: module.id,
  selector: 'faraday-app',
  templateUrl: 'faraday.component.html',
  styleUrls: ['faraday.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    MdIconRegistry,
    Services,
  ]
})
@Routes([
  {path: '/', component: LoginComponent},
  {path: '/login', component: LoginComponent},
  {path: '/admin', component: AdminComponent},
  {path: '/participant', component: ParticipantComponent},
  {path: '/podium', component: PodiumComponent},
  {path: '/projector', component: ProjectorComponent},
])
export class FaradayAppComponent {

  debug = true;

  constructor() {}

}
