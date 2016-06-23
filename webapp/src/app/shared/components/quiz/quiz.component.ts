import { Component, OnInit } from '@angular/core';

import { QuizService } from '../../services/quiz.service';

@Component({
  moduleId: module.id,
  selector: 'app-quiz',
  templateUrl: 'quiz.component.html',
  styleUrls: ['quiz.component.css'],
  providers: [QuizService],
})
export class QuizComponent implements OnInit {

  quiz={};
  constructor(
    private quizService: QuizService) {}

  ngOnInit() {
    // FIXME hardcoded quiz
    this.quizService.getMockQuiz().then(
      (quiz) => {
        this.quiz = quiz;
      }
    );
  }

}
