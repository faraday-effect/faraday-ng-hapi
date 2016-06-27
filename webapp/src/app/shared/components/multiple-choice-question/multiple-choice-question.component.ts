import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import {MaterializeDirective} from "angular2-materialize";

@Component({
  moduleId: module.id,
  selector: 'app-multiple-choice-question',
  templateUrl: 'multiple-choice-question.component.html',
  styleUrls: ['multiple-choice-question.component.css'],
  directives: [MaterializeDirective]
})
export class MultipleChoiceQuestionComponent implements OnInit {

  @Input() multipleChoiceQuestion;
  @Input() questionNumber;
  @Output() onAnswered = new EventEmitter();

  checkedAnswerID = null;

  constructor() {}

  ngOnInit() {
  }

  selectAnswer(questionID, answerID) {
    this.onAnswered.emit(
      {
        questionID: questionID,
        answerID: answerID
      }
    );
    this.checkedAnswerID = answerID;
  }

}
