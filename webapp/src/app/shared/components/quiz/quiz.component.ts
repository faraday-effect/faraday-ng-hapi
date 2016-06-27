import { Component, OnInit } from '@angular/core';

import { QuizService } from '../../services/quiz.service';
import { MultipleChoiceQuestionComponent } from '../multiple-choice-question';

@Component({
  moduleId: module.id,
  selector: 'app-quiz',
  templateUrl: 'quiz.component.html',
  styleUrls: ['quiz.component.css'],
  providers: [QuizService],
  directives: [MultipleChoiceQuestionComponent],
})
export class QuizComponent implements OnInit {

  quiz={};

  quizResponses=[];
  quizComplete = false;

  constructor(
    private quizService: QuizService) {}

  ngOnInit() {
    // FIXME hardcoded quiz
    this.quizService.getMockQuiz().then(
      (quiz) => {
        this.quiz = quiz;
        for (let question of quiz.questions){
          this.quizResponses.push(
            {
              questionUUID: question.uuid,
              answerID: null//initialized as null; eventually set to the answerID
            }
          )
        }
      }
    )

  }

  onAnswered(response) {
    var answerIndex;
    for (let i in this.quizResponses) {
      if (this.quizResponses[i].questionUUID === response.questionID){
        answerIndex = i;
      }
    }
    this.quizResponses[answerIndex].answerID = response.answerID;
    this.checkIfComplete();
    console.log(this.quizResponses);
  }

  checkIfComplete() {
    var complete = true;
    for (let response of this.quizResponses) {
      if (response.answerID === null) {// this question has not been answered
        complete = false;
      }
    }
    this.quizComplete = complete;
  }

  submitResponses() {
    console.log(this.quizResponses);
  }

}
