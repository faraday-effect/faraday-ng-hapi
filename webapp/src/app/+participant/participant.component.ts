import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { QuizComponent } from '../shared/components/quiz/quiz.component';

@Component({
  moduleId: module.id,
  selector: 'app-participant',
  templateUrl: 'participant.component.html',
  styleUrls: ['participant.component.css'],
  directives: [ROUTER_DIRECTIVES],
})
export class ParticipantComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
